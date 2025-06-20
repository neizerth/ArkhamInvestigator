import { boardAbilityValueChanged } from "./store";

export const createAbilityActionFilter = (id: string) => (action: unknown) => {
	if (!boardAbilityValueChanged.match(action)) {
		return false;
	}

	return id === action.payload.abilityId;
};
