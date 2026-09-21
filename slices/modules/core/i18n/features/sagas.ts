import { spawn } from "redux-saga/effects";
import { detectDefaultLanguageSaga } from "./detect-default-language/sagas";
import { loadTranslationSaga } from "./load-translation/loadTranslationSaga";

export function* i18nFeaturesSaga() {
	yield spawn(detectDefaultLanguageSaga);
	yield spawn(loadTranslationSaga);
}
