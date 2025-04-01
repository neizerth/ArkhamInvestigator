import type { AppThunkCreator } from "@shared/lib";
import { setLoadingLanguage } from "../i18n";
import {
	fetchArkhamDBTranslationData,
	fetchTranslationData,
} from "./fetchTranslationData";

export const loadTranslation: AppThunkCreator =
	(language: string) => (dispatch) => {
		dispatch(setLoadingLanguage(language));
		dispatch(fetchTranslationData(language));
		dispatch(fetchArkhamDBTranslationData(language));
	};
