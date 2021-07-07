import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import profile from "src/api/profile";
import { RootState } from "../store";
import { request } from "./appSlice";

export interface ProfileState {
  userData: profile.Info;
}

const initialProfileState = {
  firstName: null,
  lastName: null,
  country: null,
  id: null,
  phoneNumber: null,
  roleID: null,
};

const initialState: ProfileState = {
  userData: initialProfileState,
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (payload: { user_id: number }, { dispatch }) => {
    const data = await dispatch(
      request({
        apiName: "profile",
        apiMethod: "getProfile",
        data: payload,
      })
    );
    return data.payload;
  }
);

export const changeName = createAsyncThunk(
  "profile/changeName",
  async (payload: string, { dispatch }) => {
    const data = await dispatch(
      request({
        apiName: "profile",
        apiMethod: "changeName",
        data: payload,
      })
    );
    return data.payload;
  }
);

export const changeEmail = createAsyncThunk(
  "profile/changeEmail",
  async (payload: string, { dispatch }) => {
    const data = await dispatch(
      request({
        apiName: "profile",
        apiMethod: "changeEmail",
        data: payload,
      })
    );
    return data.payload;
  }
);

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (payload: string, { dispatch }) => {
    const data = await dispatch(
      request({
        apiName: "profile",
        apiMethod: "changePassword",
        data: payload,
      })
    );
    return data.payload;
  }
);

export const logout = createAsyncThunk(
  "profile/logout",
  async (payload, { dispatch }) => {
    const data = await dispatch(
      request({
        apiName: "profile",
        apiMethod: "logout",
        data: payload,
      })
    );
    return data.payload;
  }
);

export const deleteAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (payload, { dispatch }) => {
    const data = await dispatch(
      request({
        apiName: "profile",
        apiMethod: "deleteAccount",
        data: payload,
      })
    );
    return data.payload;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ProfileState>) => {
      state.userData = action.payload.userData;
    },
    clear: (state) => {
      state.userData = initialState.userData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeName.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        const [firstName, lastName] = (action.payload as string).split(" ");
        state.userData.firstName = firstName;
        state.userData.lastName = lastName;
      }
    });
  },
});

export const { setUserData, clear } = profileSlice.actions;

export const userDataSelector = (state: RootState) => state.profile.userData;
export const userIdSelector = (state: RootState) => userDataSelector(state).id;

export default profileSlice.reducer;
