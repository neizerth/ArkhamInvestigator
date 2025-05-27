import { useAppDispatch } from "@shared/lib";
import { toggleAbilityUse } from "@shared/lib/store/features/board/actions/stats/ability";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { useCallback } from "react";

export const useBaseAbility = (ability: InvestigatorAbility) => {
	const { id } = ability;
	const dispatch = useAppDispatch();

	return useCallback(() => {
		dispatch(toggleAbilityUse(id));
	}, [dispatch, id]);
};
