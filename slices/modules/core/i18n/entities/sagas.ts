import { spawn } from "redux-saga/effects";
import { languageEntitySaga } from "./language/sagas";
import { translationEntitySaga } from "./translation/sagas";

export function* i18nEntitiesSaga() {
	yield spawn(translationEntitySaga);
	yield spawn(languageEntitySaga);
}
