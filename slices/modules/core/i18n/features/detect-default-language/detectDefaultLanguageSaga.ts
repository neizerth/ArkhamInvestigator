import { appInfoUpdated } from "@modules/core/app/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { detectLanguage } from "../../entities/language/detectLanguage";
import { selectLanguage } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof appInfoUpdated>) {
	const availableLanguages = payload.languages;
	const language: ReturnType<typeof selectLanguage> =
		yield select(selectLanguage);

	if (language !== null) {
		return;
	}

	yield put(
		detectLanguage({
			availableLanguages,
		}),
	);
}

export function* detectDefaultLanguageSaga() {
	yield takeEvery(appInfoUpdated.match, worker);
}
