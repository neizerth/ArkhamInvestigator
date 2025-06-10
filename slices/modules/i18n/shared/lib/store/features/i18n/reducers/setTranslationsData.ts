import { hyphens2camelCase } from "@shared/lib";
import type { ArkhamDivider } from "arkham-divider-data";
import { pick } from "ramda";
import {
	I18N_NAMESAPCE,
	i18next,
	translations,
} from "../../../../../../config";
import { saveStoreTranslation } from "../../../../storage";
import type { I18NReducer } from "../i18n.types";

export const setTranslationsData: I18NReducer<ArkhamDivider.Translation> = (
	state,
	{ payload },
) => {
	const { loadingLanguage, language } = state;

	if (!loadingLanguage) {
		return state;
	}

	const data = pick(
		["encounterSets", "campaigns", "scenarios", "stories", "common"],
		payload,
	);

	const appTranslation = translations[loadingLanguage] || {};

	const bundle = Object.assign(
		{},
		translations.en,
		...Object.values(data),
		appTranslation,
	);

	const languageKey = hyphens2camelCase(loadingLanguage);

	i18next.addResourceBundle(languageKey, I18N_NAMESAPCE, bundle);
	i18next.changeLanguage(languageKey);

	saveStoreTranslation(bundle);

	if (language !== loadingLanguage && language) {
		const removeKey = hyphens2camelCase(language);
		i18next.removeResourceBundle(removeKey, I18N_NAMESAPCE);
	}

	return {
		...state,
		language: loadingLanguage,
		loadingLanguage: null,
	};
};
