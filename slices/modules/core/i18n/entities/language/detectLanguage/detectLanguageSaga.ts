import {
	getDefaultLanguage,
	selectCurrentLanguage,
} from "@modules/core/i18n/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { changeLanguage } from "../changeLanguage";
import { detectLanguage } from "./detectLanguage";

function* worker({ payload }: ReturnType<typeof detectLanguage>) {
	const { availableLanguages } = payload;

	const language: ReturnType<typeof selectCurrentLanguage> = yield select(
		selectCurrentLanguage,
	);

	const defaultLanguage = getDefaultLanguage(availableLanguages);

	if (language !== defaultLanguage) {
		return;
	}

	yield put(changeLanguage(defaultLanguage));
}

export function* detectLanguageSaga() {
	yield takeEvery(detectLanguage.match, worker);
}
