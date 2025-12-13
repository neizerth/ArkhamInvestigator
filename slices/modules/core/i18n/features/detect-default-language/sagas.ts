import { spawn } from "redux-saga/effects";
import { detectOnUpdateFailSaga } from "./detectOnUpdateFailSaga";
import { detectOnUpdateSaga } from "./detectOnUpdateSaga";

export function* detectDefaultLanguageSaga() {
	yield spawn(detectOnUpdateSaga);
	yield spawn(detectOnUpdateFailSaga);
}
