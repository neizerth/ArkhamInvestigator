import { takeEvery } from "redux-saga/effects";
import { createActualValueIncreaseWorker } from "../../util";
import { healHorror } from "./healHorror";

const worker = createActualValueIncreaseWorker("sanity");

export function* healHorrorSaga() {
	yield takeEvery(healHorror.match, worker);
}
