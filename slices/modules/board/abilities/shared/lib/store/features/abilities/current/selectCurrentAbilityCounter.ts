import { selectBoardAbilityCounter } from "../selectBoardAbilityCounter";

export const selectCurrentAbilityCounter = (abilityId: string) =>
	selectBoardAbilityCounter({
		abilityId,
	});
