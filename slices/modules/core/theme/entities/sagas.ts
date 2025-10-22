import { spawn } from "redux-saga/effects";
import { openThemeModalSaga } from "./openThemeModal/sagas/openThemeModalSaga";

export function* themeEntitiesSaga() {
	yield spawn(openThemeModalSaga);
}
