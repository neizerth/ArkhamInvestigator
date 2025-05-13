import { useAppTranslation } from "@features/i18n";
import {
	decreaseCurrentStat,
	reduceCurrentStat,
	selectAbilityUseInfo,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { inc } from "ramda";
import { useCallback } from "react";
import { usePerInvestigatorAbility } from "./usePerInvestigatorAbility";

// Carson Sinclair personal ability
export const useGiveActionAbility = (ability: InvestigatorAbility) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const useInfo = useAppSelector(selectAbilityUseInfo(ability.id));
	const boardIds = useInfo?.boardIds || [];

	const onChange = useCallback(
		(boardId: number) => {
			dispatch(
				reduceCurrentStat({
					boardId,
					type: "actions",
					reducer: inc,
					options: {
						addToHistory: false,
					},
				}),
			);

			const minDecreaseCount = ability.additionalAction ? 1 : 0;

			if (boardIds.length < minDecreaseCount) {
				return;
			}

			dispatch(decreaseCurrentStat("actions"));
		},
		[dispatch, boardIds, ability],
	);

	return usePerInvestigatorAbility({
		ability,
		title: t`Give an action`,
		onChange,
	});
};
