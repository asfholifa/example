import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "src/api";
import { RootState } from "@redux/store";

interface AppState {
  loading: AppLoadingState;
  error: AppErrorState;
}

interface AppLoadingState {
  [key: string]: {
    [key: string]: boolean;
  };
}

interface AppErrorState {
  [key: string]: {
    [key: string]: {
      msg: string;
      code: string;
      data: any;
    };
  };
}

interface AppRequestProps {
  apiName: string;
  apiMethod: string;
  data: any;
  beforeCallback?: () => any;
  afterCallback?: () => any;
}

const initialState: AppState = {
  loading: {},
  error: {},
};

export const request = createAsyncThunk(
  "app/request",
  async ({
    apiName,
    apiMethod,
    data,
    beforeCallback = () => null,
    afterCallback = () => null,
  }: AppRequestProps) => {
    beforeCallback();
    const response = await Api[apiName][apiMethod](data);
    afterCallback();
    return response;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<AppLoadingState>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<AppErrorState>) => {
      state.error = action.payload;
    },
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(request.pending, (state, action) => {
        const { apiName, apiMethod } = action.meta.arg;

        state.loading = {
          ...state.loading,
          [apiName]: {
            ...state.loading[apiName],
            [apiMethod]: true,
          },
        };
      })
      .addCase(request.fulfilled, (state, action) => {
        const newState = { ...state.loading };
        const { apiName, apiMethod } = action.meta.arg;

        delete newState[apiName][apiMethod];

        if (Object.values(newState[apiName])) {
          delete newState[apiName];
        }

        state.loading = newState;
      })
      .addCase(request.rejected, (state, action) => {
        const newState = { ...state.loading };
        const { apiName, apiMethod, data } = action.meta.arg;
        const { message, code } = action.error;
        console.warn(message);

        delete newState[apiName][apiMethod];

        if (Object.values(newState[apiName])) {
          delete newState[apiName];
        }

        state.loading = newState;
        state.error = {
          ...state.error,
          [apiName]: {
            ...state.error[apiName],
            [apiMethod]: {
              msg: message || "",
              code: code || "",
              data,
            },
          },
        };
      });
  },
});

export const { setLoading, setError, clear } = appSlice.actions;

export const loadingSelector = (state: RootState) => state.app.loading;

export default appSlice.reducer;
