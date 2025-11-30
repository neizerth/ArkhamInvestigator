import { takeEvery } from "redux-saga/effects";
import { createActualValueDecreaseWorker } from "../../util";
import { spendResources } from "./spendResources";

const worker = createActualValueDecreaseWorker("resources");

export function* spendResourcesSaga() {
	yield takeEvery(spendResources.match, worker);
}
