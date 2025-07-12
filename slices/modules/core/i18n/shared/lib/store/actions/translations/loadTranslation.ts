import type { AppThunk } from "@shared/model";
import { setLoadingLanguage } from "../../i18n";
import { fetchTranslationData } from "./fetchTranslationData";
import { loadContentTranslation } from "./loadContentTranslation";

export const loadTranslation =
	(language: string): AppThunk =>
	(dispatch) => {
		dispatch(setLoadingLanguage(language));
		dispatch(fetchTranslationData(language));
		dispatch(loadContentTranslation(language));
	};
