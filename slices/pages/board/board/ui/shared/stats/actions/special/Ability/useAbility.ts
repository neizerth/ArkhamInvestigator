import { toggleBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { useAppDispatch } from "@shared/lib";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { useCallback } from "react";

export const useAbility = (ability: InvestigatorAbility) => {
	const { id } = ability;
	const dispatch = useAppDispatch();

	return useCallback(() => {
		dispatch(
			toggleBoardAbilityUse({
				boardId: "current",
				abilityId: id,
			}),
		);
	}, [dispatch, id]);
};
