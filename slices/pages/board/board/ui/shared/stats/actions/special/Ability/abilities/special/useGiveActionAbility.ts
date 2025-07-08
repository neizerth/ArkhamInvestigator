import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { useAppDispatch } from "@shared/lib";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { usePerInvestigatorAbility } from "./usePerInvestigatorAbility";

// Carson Sinclair personal ability
export const useGiveActionAbility = (ability: InvestigatorAbility) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	// const onChange = useCallback(
	// 	(boardId: number) => {
	// 		dispatch(
	// 			giveActionToBoard({
	// 				boardId,
	// 				ability,
	// 			}),
	// 		);
	// 	},
	// 	[dispatch, ability],
	// );

	const onChange = () => {};

	return usePerInvestigatorAbility({
		ability,
		title: t`Give an action`,
		onChange,
	});
};
