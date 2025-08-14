import { getDefaultLanguage } from "@modules/core/i18n/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { changeLanguage } from "../changeLanguage";
import { detectLanguage } from "./detectLanguage";

function* worker({ payload }: ReturnType<typeof detectLanguage>) {
	const { availableLanguages } = payload;

	const defaultLanguage = getDefaultLanguage(availableLanguages);

	yield put(changeLanguage(defaultLanguage));
}

export function* detectLanguageSaga() {
	yield takeEvery(detectLanguage.match, worker);
}
