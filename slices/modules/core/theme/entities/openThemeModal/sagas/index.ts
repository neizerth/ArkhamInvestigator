import { fork } from "redux-saga/effects";
import { openThemeModalSaga as openModalSaga } from "./openThemeModalSaga";
import { validateThemeUrlSaga } from "./validateThemeUrlSaga";

export function* openThemeModalSaga() {
	yield fork(openModalSaga);
	yield fork(validateThemeUrlSaga);
}
