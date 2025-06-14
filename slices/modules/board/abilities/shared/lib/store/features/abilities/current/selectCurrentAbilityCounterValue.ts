import { selectBoardAbilityCounterValue } from "../selectBoardAbilityCounterValue";

export const selectCurrentAbilityCounterValue = (abilityId: string) =>
	selectBoardAbilityCounterValue({
		abilityId,
		boardId: "current",
	});
