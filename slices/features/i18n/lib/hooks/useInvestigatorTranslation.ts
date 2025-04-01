import { DEFAULT_LANGUAGE } from "@features/i18n/config";
import type { InvestigatorBoardSource } from "@shared/model";
import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import { useCallback } from "react";
import { useAppSelector } from "../../../../shared/lib/hooks/store/useAppSelector";
import { selectLanguage } from "../store";

export const useInvestigatorTranslation = (
	investigator: InvestigatorBoardSource,
) => {
	const language = useAppSelector(selectLanguage);

	return useCallback(
		(prop: keyof ArkhamDBInvestigatorCard) => {
			const value = investigator[prop] || "";
			const propLanguage = investigator.translated.includes(prop)
				? language
				: DEFAULT_LANGUAGE;

			return [value, propLanguage] as [string, string];
		},
		[investigator, language],
	);
};
