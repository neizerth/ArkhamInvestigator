import { spawn } from "redux-saga/effects";
import { initI18NSaga } from "./init-i18n/initI18NSaga";

export function* i18nFeaturesSaga() {
	yield spawn(initI18NSaga);
}
