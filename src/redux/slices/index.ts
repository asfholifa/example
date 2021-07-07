import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "@redux/slices/counterSlice";
import profileReducer from "@redux/slices/profileSlice";
import authReducer from "@redux/slices/authSlice";
import appReducer from "@redux/slices/appSlice";
import botsSlice from "@redux/slices/botsSlice";

const rootReducer = {
  counter: counterReducer,
  profile: profileReducer,
  auth: authReducer,
  app: appReducer,
  bots: botsSlice,
};

export default function createReducer(injectedReducers = {}) {
  const reducer = combineReducers({
    ...rootReducer,
    ...injectedReducers,
  });

  return reducer;
}
