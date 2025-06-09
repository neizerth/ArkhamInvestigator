import { toggleAbilityEffect } from "@entities/abilities/lib";
import {
	selectIsAbilityUsed,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { toggleAbilityUse } from "@shared/lib/store/features/board/actions/stats/ability";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { useCallback } from "react";

export const useBaseAbility = (ability: InvestigatorAbility) => {
	const { id } = ability;
	const dispatch = useAppDispatch();
	const isUsed = useAppSelector(selectIsAbilityUsed(id));

	return useCallback(() => {
		dispatch(toggleAbilityUse(id));

		dispatch(
			toggleAbilityEffect({
				abilityId: id,
				isUsed,
			}),
		);
	}, [dispatch, id, isUsed]);
};
