import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import AuthAPI from "src/api/auth";
import { RootState } from "../store";
import { request } from "./appSlice";
import { setUserData } from "./profileSlice";

const initialState: AuthAPI.AuthState = {
  token: null,
  isAuthorized: false,
  error: null,
};

const setUser = (
  data: any,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  const {
    id,
    roleID,
    country,
    firstName,
    lastName,
    phoneNumber,
    accessToken,
    refreshToken,
  } = data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  dispatch(
    setUserData({
      userData: { id, roleID, country, firstName, lastName, phoneNumber },
    })
  );
  dispatch({
    type: "auth/setToken",
    payload: { token: accessToken },
  });
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: AuthAPI.Request, { dispatch }) => {
    const data = await dispatch(
      request({
        apiName: "auth",
        apiMethod: "signIn",
        data: payload,
      })
    );
    if (data.payload) {
      setUser(data.payload, dispatch);
    }
    return data.payload;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload: AuthAPI.Request, { dispatch }) => {
    const data = await dispatch(
      request({
        apiName: "auth",
        apiMethod: "signUp",
        data: payload,
      })
    );

    return data.payload;
  }
);

export const signInByToken = createAsyncThunk(
  "auth/loginAsUser",
  async (payload: string, { dispatch }) => {
    const data = await dispatch(
      request({
        apiName: "auth",
        apiMethod: "signInByToken",
        data: payload,
      })
    );
    if (data.payload) {
      setUser(data.payload, dispatch);
    }
    return data.payload;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthorized = true;
    },
    clear: () => initialState,
  },
});

export const { setToken, clear } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export const isAuthorizedSelector = (state: RootState) =>
  authSelector(state).isAuthorized;

export default authSlice.reducer;
