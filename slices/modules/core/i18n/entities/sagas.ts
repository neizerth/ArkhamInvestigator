import { spawn } from "redux-saga/effects";
import { languageEntitySaga } from "./language/sagas";
import { restoreTranslationsSaga } from "./translation/restoreTranslation/restoreTranslationsSaga";

export function* i18nEntitiesSaga() {
	yield spawn(languageEntitySaga);
	yield spawn(restoreTranslationsSaga);
}
