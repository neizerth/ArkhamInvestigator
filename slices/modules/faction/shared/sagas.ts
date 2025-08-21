import { spawn } from "redux-saga/effects";
import { factionSelectSaga } from "./ui/faction-select/sagas";

export function* factionSharedSaga() {
	yield spawn(factionSelectSaga);
}
