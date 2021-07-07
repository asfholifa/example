import { RootState } from "@redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import BotAPI from "src/api/botApi";
import { request } from "./appSlice";

interface BotState {
  botList: BotAPI.IBot[];
}

const initialState: BotState = {
  botList: [],
};

export const getBotList = createAsyncThunk(
  "bots/getBotList",
  async (payload: { user_id: number }, { dispatch }) => {
    const response = await dispatch(
      request({
        apiName: "bot",
        apiMethod: "getBotList",
        data: payload,
      })
    );

    return response.payload;
  }
);

export const getBot = createAsyncThunk(
  "bots/getBot",
  async (payload: { id: number }, { dispatch }) => {
    const response = await dispatch(
      request({
        apiName: "bot",
        apiMethod: "getBot",
        data: payload,
      })
    );

    return response.payload;
  }
);

export const appSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    setBot: (state, action: PayloadAction<BotAPI.IBot[]>) => {
      state.botList = action.payload;
    },
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getBotList.fulfilled, (state, action) => {
      state.botList = action.payload;
    });
  },
});

export const { setBot, clear } = appSlice.actions;

export const botListSelector = (state: RootState) => state.bots.botList;

export const botsLengthSelector = (state: RootState) =>
  botListSelector(state).length;

export const botsIdSelector = (state: RootState) =>
  botListSelector(state).map((el) => el.id);

export default appSlice.reducer;
