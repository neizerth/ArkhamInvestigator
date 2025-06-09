import { giveActionToBoard } from "@entities/abilities/lib";
import { useAppTranslation } from "@features/i18n";
import { useAppDispatch } from "@shared/lib";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { useCallback } from "react";
import { usePerInvestigatorAbility } from "./usePerInvestigatorAbility";

// Carson Sinclair personal ability
export const useGiveActionAbility = (ability: InvestigatorAbility) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	const onChange = useCallback(
		(boardId: number) => {
			dispatch(
				giveActionToBoard({
					boardId,
					ability,
				}),
			);
		},
		[dispatch, ability],
	);

	return usePerInvestigatorAbility({
		ability,
		title: t`Give an action`,
		onChange,
	});
};
