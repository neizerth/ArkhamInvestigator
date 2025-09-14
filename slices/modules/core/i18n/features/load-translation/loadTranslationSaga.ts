import { translations } from "@assets/i18n/core";
import { translationAPI } from "@shared/api";
import { BUILD_VERSION } from "@shared/config/app";
import { seconds } from "@shared/lib";
import type { GameTranslationData } from "@shared/model";
import type { AxiosResponse } from "axios";
import { pick } from "ramda";
import { put, retry, takeLatest } from "redux-saga/effects";
import { setTranslation } from "../../entities/translation/setTranslation";
import { DEFAULT_LANGUAGE } from "../../shared/config";
import {
	StoreTranslation,
	loadLanguage,
	mergeTranslations,
	setLanguage,
} from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof loadLanguage>) {
	const language = payload ?? DEFAULT_LANGUAGE;
	const pathLanguage = language === DEFAULT_LANGUAGE ? "core" : language;

	const path = `${pathLanguage}.json?v=${BUILD_VERSION}`;

	const maxTries = 5;
	const delayMs = seconds(1);

	const response: AxiosResponse<GameTranslationData> = yield retry(
		maxTries,
		delayMs,
		translationAPI.get,
		path,
	);

	const localTranslation = translations?.[language] || {};

	const data = pick(
		["encounterSets", "campaigns", "scenarios", "stories", "common"],
		response.data,
	);

	const uiTranslation: Record<string, string> = Object.assign(
		{},
		...Object.values(data),
	);

	const storeTranslation = {
		...translations.en,
		...uiTranslation,
	};

	StoreTranslation.save(language, storeTranslation);

	const translation = mergeTranslations(storeTranslation, localTranslation);

	yield put(
		setTranslation({
			language,
			translation,
		}),
	);

	yield put(setLanguage(language));
}

export function* loadTranslationSaga() {
	yield takeLatest(loadLanguage.match, worker);
}
