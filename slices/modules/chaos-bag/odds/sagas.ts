import { spawn } from "redux-saga/effects";
import { chaosBagOddsFeaturesSaga } from "./features/sagas";

export function* chaosBagOddsSaga() {
	yield spawn(chaosBagOddsFeaturesSaga);
}
