import axios, { AxiosRequestConfig } from "axios";

interface IFailedQueue {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

const { REACT_APP_FRONT_HOST } = process.env;
let isRefreshing: boolean;
let failedQueue: IFailedQueue[] = [];

namespace Http {
  export const Private = axios.create({
    baseURL: REACT_APP_FRONT_HOST,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      refreshToken: localStorage.getItem("refreshToken"),
    },
  });

  export const Public = axios.create({
    baseURL: REACT_APP_FRONT_HOST,
    timeout: 1000,
  });

  const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  const requestHandler = (request: AxiosRequestConfig) => request;

  const errorHandler = (error: any) => Promise.reject(error);

  Private.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
  );

  Public.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
  );

  Private.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = token;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          Private.post("/auth/refreshJWT")
            .then(({ data }) => {
              Private.defaults.headers.common.Authorization = `Bearer ${data.authToken}`;
              Private.defaults.headers.common.refreshToken = data.refreshToken;
              originalRequest.headers.Authorization = `Bearer ${data.authToken}`;
              originalRequest.headers.refreshToken = data.refreshToken;
              localStorage.setItem("accessToken", data.authToken);
              localStorage.setItem("refreshToken", data.refreshToken);
              processQueue(null, data.authToken);
              resolve(axios(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );
}

export default Http;
