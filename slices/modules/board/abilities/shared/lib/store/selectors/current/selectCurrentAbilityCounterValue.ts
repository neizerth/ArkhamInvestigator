import { selectBoardAbilityValue } from "../selectBoardAbilityValue";

export const selectCurrentAbilityCounterValue = (abilityId: string) =>
	selectBoardAbilityValue({
		abilityId,
		boardId: "current",
	});
