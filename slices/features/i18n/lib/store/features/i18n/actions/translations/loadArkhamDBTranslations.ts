import { DEFAULT_LANGUAGE } from "@features/i18n/config";
import { loadArkhamDBInvestigatorTranslations } from "@shared/api";
import type { AppThunk } from "@shared/lib";
import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import { propEq } from "ramda";
import { setInvestigatorTranslations } from "../../i18n";
import { updateBoardTranslations } from "./updateBoardTranslations";

export const loadArkhamDBTranslations =
	(language: string): AppThunk =>
	async (dispatch) => {
		let source: ArkhamDBInvestigatorCard[] = [];
		if (language !== DEFAULT_LANGUAGE) {
			source = await loadArkhamDBInvestigatorTranslations(DEFAULT_LANGUAGE);
		}
		const translations = await loadArkhamDBInvestigatorTranslations(language);

		const merged = source.filter((item) => {
			const translation = translations.find(propEq(item.code, "code"));

			return translation || item;
		});

		dispatch(setInvestigatorTranslations(merged));
		dispatch(updateBoardTranslations());
	};
