import { loadArkhamDBInvestigatorTranslations } from "@shared/api";
import type { AppThunk } from "@shared/lib";
import { setInvestigatorTranslations } from "../../i18n";
import { updateBoardTranslations } from "./updateBoardTranslations";

export const loadArkhamDBTranslations =
	(language: string): AppThunk =>
	async (dispatch) => {
		const translations = await loadArkhamDBInvestigatorTranslations(language);
		dispatch(setInvestigatorTranslations(translations));
		dispatch(updateBoardTranslations());
	};
