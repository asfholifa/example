import { all, call } from "redux-saga/effects";
import CounterSaga from "./CounterSaga";

export default function* rootSaga() {
  yield all([call(CounterSaga)]);
}
