import type { ArkhamDivider } from "arkham-divider-data";
import { includes, reject } from "ramda";
import type { I18NReducer } from "../i18n.types";

export const setAvailableLanguages: I18NReducer<ArkhamDivider.Core> = (
	state,
	{ payload },
) => {
	const { languages } = payload;
	const availableLanguages = reject(includes("zh-cn"), languages);

	return {
		...state,
		availableLanguages,
	};
};
