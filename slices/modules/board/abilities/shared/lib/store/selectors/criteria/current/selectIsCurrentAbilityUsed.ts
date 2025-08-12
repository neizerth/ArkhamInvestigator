import { selectIsBoardAbilityUsed } from "../selectIsBoardAbilityUsed";

export const selectIsCurrentAbilityUsed = (abilityId: string) =>
	selectIsBoardAbilityUsed({
		abilityId,
		boardId: "current",
	});
