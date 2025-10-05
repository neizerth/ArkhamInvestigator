import { spawn } from "redux-saga/effects";
import { setFactionFilterSaga } from "./set-faction-filter/sagas";

export function* factionFilterSaga() {
	yield spawn(setFactionFilterSaga);
}
