import { spawn } from "redux-saga/effects";
import { i18nFeaturesSaga } from "./features/sagas";

export function* i18nSaga() {
	yield spawn(i18nFeaturesSaga);
}
