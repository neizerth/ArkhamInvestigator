import { factionSelectSaga } from "@modules/faction/shared/faction-select/lib/store/sagas";
import { spawn } from "redux-saga/effects";

export function* factionSaga() {
	yield spawn(factionSelectSaga);
}
