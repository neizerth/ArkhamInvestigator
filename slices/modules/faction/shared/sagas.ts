import { spawn } from "redux-saga/effects";
import { factionSelectSaga } from "./faction-select/sagas";

export function* factionSharedSaga() {
	yield spawn(factionSelectSaga);
}
