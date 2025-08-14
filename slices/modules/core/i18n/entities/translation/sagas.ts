import { spawn } from "redux-saga/effects";
import { restoreTranslationsSaga } from "./restoreTranslation/restoreTranslationsSaga";
import { setTranslationSaga } from "./setTranslation/setTranslationSaga";

export function* translationEntitySaga() {
	yield spawn(restoreTranslationsSaga);
	yield spawn(setTranslationSaga);
}
