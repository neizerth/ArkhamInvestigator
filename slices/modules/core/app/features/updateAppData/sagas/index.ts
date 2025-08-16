import { spawn } from "redux-saga/effects";
import { updateAppDataOnLanguageChangeSaga } from "./updateAppDataOnLanguageChangeSaga";
import { updateAppDataSaga as updateSaga } from "./updateAppDataSaga";

export function* updateAppDataSaga() {
	yield spawn(updateAppDataOnLanguageChangeSaga);
	yield spawn(updateSaga);
}
