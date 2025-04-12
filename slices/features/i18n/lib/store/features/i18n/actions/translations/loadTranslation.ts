import type { AppThunkCreator } from "@shared/model";
import { setLoadingLanguage } from "../../i18n";
import { fetchTranslationData } from "./fetchTranslationData";
import { loadSignatureTranslations } from "./loadSignatureTranslations";

export const loadTranslation: AppThunkCreator =
	(language: string) => (dispatch) => {
		dispatch(setLoadingLanguage(language));
		dispatch(fetchTranslationData(language));
		dispatch(loadSignatureTranslations(language));
	};
