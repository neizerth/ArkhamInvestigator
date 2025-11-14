import { takeEvery } from "redux-saga/effects";
import { createActualValueDecreaseWorker } from "../../util";
import { takeHorror } from "./takeHorror";

const worker = createActualValueDecreaseWorker("sanity");

export function* takeHorrorSaga() {
	yield takeEvery(takeHorror.match, worker);
}
