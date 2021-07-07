import { delay, put, takeEvery } from "redux-saga/effects";
import { increment } from "@redux/slices/counterSlice";

export function* incrementAsync() {
  yield delay(1000);
  yield put(increment());
}

export default function* CounterSaga() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}
