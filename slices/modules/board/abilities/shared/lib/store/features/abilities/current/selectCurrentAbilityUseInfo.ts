import { selectBoardAbilityUseInfo } from "../selectBoardAbilityUseInfo";

export const selectCurrentAbilityUseInfo = (abilityId: string) =>
	selectBoardAbilityUseInfo({
		abilityId,
		boardId: "current",
	});
