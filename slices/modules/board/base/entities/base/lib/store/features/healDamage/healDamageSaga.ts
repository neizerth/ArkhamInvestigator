import { takeEvery } from "redux-saga/effects";
import { createActualValueIncreaseWorker } from "../../util";
import { healDamage } from "./healDamage";

const worker = createActualValueIncreaseWorker("health");

export function* healDamageSaga() {
	yield takeEvery(healDamage.match, worker);
}
