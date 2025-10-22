import { spawn } from "redux-saga/effects";
import { openThemeModalSaga } from "./openThemeModal/sagas";
import { validateThemeUrlSaga } from "./openThemeModal/sagas/validateThemeUrlSaga";

export function* themeEntitiesSaga() {
	yield spawn(openThemeModalSaga);
	yield spawn(validateThemeUrlSaga);
}
