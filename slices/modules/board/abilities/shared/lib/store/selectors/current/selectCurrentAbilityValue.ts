import { selectBoardAbilityValue } from "../selectBoardAbilityValue";

export const selectCurrentAbilityValue = (abilityId: string) =>
	selectBoardAbilityValue({
		abilityId,
		boardId: "current",
	});
