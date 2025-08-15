import { spawn } from "redux-saga/effects";
import { factionSharedSaga } from "./shared/sagas";

export function* factionSaga() {
	yield spawn(factionSharedSaga);
}
