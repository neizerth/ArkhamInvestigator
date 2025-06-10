import { selectBoardIsAbilityUsed } from "../selectIsBoardAbilityUsed";

export const selectIsCurrentAbilityUsed = (abilityId: string) =>
	selectBoardIsAbilityUsed({
		abilityId,
	});
