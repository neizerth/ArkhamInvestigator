import { spawn } from "redux-saga/effects";
import { chaosBagRevealEntitiesSaga as revealSaga } from "./lib/store/sagas";

export function* chaosBagRevealEntitiesSaga() {
	yield spawn(revealSaga);
}
