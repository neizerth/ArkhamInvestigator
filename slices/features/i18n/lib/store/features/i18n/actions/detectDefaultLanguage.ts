import { getDefaultLanguage } from "@features/i18n/lib/detect";
import type { AppThunk } from "@shared/lib";
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
