import { spawn } from "redux-saga/effects";
import { detectDefaultLanguageSaga } from "./detect-default-language/sagas";
import { initI18NSaga } from "./init-i18n/initI18NSaga";
import { loadTranslationSaga } from "./load-translation/loadTranslationSaga";

export function* i18nFeaturesSaga() {
	yield spawn(initI18NSaga);
	yield spawn(detectDefaultLanguageSaga);
	yield spawn(loadTranslationSaga);
}
