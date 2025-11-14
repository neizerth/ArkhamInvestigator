import { takeEvery } from "redux-saga/effects";
import { createActualValueDecreaseWorker } from "../../util";
import { takeDamage } from "./takeDamage";

const worker = createActualValueDecreaseWorker("health");

export function* takeDamageSaga() {
	yield takeEvery(takeDamage.match, worker);
}
