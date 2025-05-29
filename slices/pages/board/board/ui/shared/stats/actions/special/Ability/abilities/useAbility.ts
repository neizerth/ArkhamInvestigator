import { SPECIAL_ABILITIES } from "@shared/config";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { usePerInvestigatorAbility } from "./special/usePerInvestigatorAbility";
import { useBaseAbility } from "./useBaseAbility";
import { useSpecialAbility } from "./useSpecialAbility";

export const useAbility = (ability: InvestigatorAbility) => {
	const onPress = useBaseAbility(ability);
	const onSpecialPress = useSpecialAbility(ability);
	const onPerInvestigatorPress = usePerInvestigatorAbility({
		ability,
	});

	const isSpecial = SPECIAL_ABILITIES.includes(ability.id);

	if (isSpecial) {
		return onSpecialPress;
	}

	if (ability.perInvestigator) {
		return onPerInvestigatorPress;
	}

	return onPress;
};
