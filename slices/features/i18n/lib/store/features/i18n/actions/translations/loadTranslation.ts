import type { AppThunkCreator } from "@shared/model";
import { setLoadingLanguage } from "../../i18n";
import { fetchTranslationData } from "./fetchTranslationData";
import { loadArkhamDBTranslations } from "./loadArkhamDBTranslations";

export const loadTranslation: AppThunkCreator =
	(language: string) => (dispatch) => {
		dispatch(setLoadingLanguage(language));
		dispatch(fetchTranslationData(language));
		dispatch(loadArkhamDBTranslations(language));
	};
