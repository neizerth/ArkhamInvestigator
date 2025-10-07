import { spawn } from "redux-saga/effects";
import { factionFilterSaga } from "./faction-filter/sagas";

export function* factionEntitiesSaga() {
	yield spawn(factionFilterSaga);
}
