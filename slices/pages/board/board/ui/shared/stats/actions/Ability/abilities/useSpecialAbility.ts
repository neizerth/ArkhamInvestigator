import { GIVE_ACTION_ABILITY } from "@shared/config";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { always, identity } from "ramda";
import { useGiveActionAbility } from "./special";

export const useSpecialAbility = (ability: InvestigatorAbility) => {
	if (ability.id === GIVE_ACTION_ABILITY) {
		return useGiveActionAbility(ability);
	}
	return always(identity);
};
