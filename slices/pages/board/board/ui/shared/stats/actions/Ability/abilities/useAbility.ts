import { SPECIAL_ABILITIES } from "@shared/config";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { useBaseAbility } from "./useBaseAbility";
import { useSpecialAbility } from "./useSpecialAbility";

export const useAbility = (ability: InvestigatorAbility) => {
	const onPress = useBaseAbility(ability);
	const onSpecialPress = useSpecialAbility(ability);

	const isSpecial = SPECIAL_ABILITIES.includes(ability.id);

	return isSpecial ? onSpecialPress : onPress;
};
