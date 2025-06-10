import { getDefaultLanguage } from "@modules/core/i18n/shared/lib/detect";
import type { AppThunk } from "@shared/model";
import { selectLanguage } from "../i18n";
import { changeLanguage } from "./changeLanguage";

export const detectDefaultLanguage =
	(availableLanguages: string[]): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const language = selectLanguage(state);

		const defaultLanguage = getDefaultLanguage(availableLanguages);

		if (language !== null) {
			return;
		}
		dispatch(changeLanguage(defaultLanguage));
	};
