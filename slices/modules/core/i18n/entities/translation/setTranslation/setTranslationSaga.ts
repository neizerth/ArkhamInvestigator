import { I18N_NAMESAPCE, i18next } from "@modules/core/i18n/shared/config";
import { hyphens2camelCase } from "@shared/lib";
import { takeEvery } from "redux-saga/effects";
import { setTranslation } from "./setTranslation";

function worker({ payload }: ReturnType<typeof setTranslation>) {
	const { translation } = payload;
	const language = hyphens2camelCase(payload.language);

	i18next.addResourceBundle(language, I18N_NAMESAPCE, translation);
	i18next.changeLanguage(language);
}

export function* setTranslationSaga() {
	yield takeEvery(setTranslation.match, worker);
}
