import { boardAbilityValueChanged } from "./store";

export const createAbilityValueFilter =
	(ids: string[]) => (action: unknown) => {
		if (!boardAbilityValueChanged.match(action)) {
			return false;
		}

		return ids.includes(action.payload.abilityId);
	};
