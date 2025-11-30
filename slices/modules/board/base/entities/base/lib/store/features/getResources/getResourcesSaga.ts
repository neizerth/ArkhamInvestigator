import { takeEvery } from "redux-saga/effects";
import { createActualValueIncreaseWorker } from "../../util";
import { getResources } from "./getResources";

const worker = createActualValueIncreaseWorker("resources");

export function* getResourcesSaga() {
	yield takeEvery(getResources.match, worker);
}
