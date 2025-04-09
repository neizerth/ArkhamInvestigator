import { useAppSelector } from "@shared/lib";
import type { InvestigatorBoardSource } from "@shared/model";
import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import { useCallback } from "react";
import { selectLanguage } from "../store";
import { useAppTranslation } from "./useAppTranslation";

export const useInvestigatorTranslation = (
	investigator: InvestigatorBoardSource,
) => {
	const language = useAppSelector(selectLanguage);
	const { translate } = useAppTranslation();

	return useCallback(
		(prop: keyof ArkhamDBInvestigatorCard) => {
			const value = investigator[prop] || "";

			if (investigator.translated.includes(prop)) {
				return [value, language] as [string, string];
			}

			return translate(value);
		},
		[investigator, language, translate],
	);
};
