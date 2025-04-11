import { loadInvestigatorSignatures } from "@shared/lib";
import type { AppThunkCreator } from "@shared/model";
import { setLoadingLanguage } from "../../i18n";
import { fetchTranslationData } from "./fetchTranslationData";

export const loadTranslation: AppThunkCreator =
	(language: string) => (dispatch) => {
		dispatch(setLoadingLanguage(language));
		dispatch(fetchTranslationData(language));
		dispatch(loadInvestigatorSignatures(language));
	};
