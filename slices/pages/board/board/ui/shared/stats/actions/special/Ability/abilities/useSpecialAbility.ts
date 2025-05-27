import { ADD_2WILD_ABILITY, GIVE_ACTION_ABILITY } from "@shared/config";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { always, identity } from "ramda";
import { useAdd2WildAbility, useGiveActionAbility } from "./special";

export const useSpecialAbility = (ability: InvestigatorAbility) => {
	if (ability.id === GIVE_ACTION_ABILITY) {
		return useGiveActionAbility(ability);
	}
	if (ability.id === ADD_2WILD_ABILITY) {
		return useAdd2WildAbility(ability);
	}
	return always(identity);
};
