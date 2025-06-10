import { selectBoardAbilityById } from "../selectBoardAbilityById";

export const selectCurrentAbilityById = (abilityId: string) =>
	selectBoardAbilityById({
		abilityId,
	});
