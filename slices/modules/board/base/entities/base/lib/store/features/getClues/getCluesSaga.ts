import { takeEvery } from "redux-saga/effects";
import { createActualValueIncreaseWorker } from "../../util";
import { getClues } from "./getClues";

const worker = createActualValueIncreaseWorker("clues");

export function* getCluesSaga() {
	yield takeEvery(getClues.match, worker);
}
