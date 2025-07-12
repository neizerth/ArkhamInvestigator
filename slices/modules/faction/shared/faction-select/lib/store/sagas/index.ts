import { spawn } from "redux-saga/effects";
import { enableSpoilerFactionModalActionSaga } from "./enableSpoilerFactionModalActionSaga";
import { openSpoilerWarningSaga } from "./openSpoilerWarningSaga";

export function* factionSelectSaga() {
	yield spawn(enableSpoilerFactionModalActionSaga);
	yield spawn(openSpoilerWarningSaga);
}
