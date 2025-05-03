import { useAppTranslation } from "@features/i18n";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { usePerInvestigatorAbility } from "./usePerInvestigatorAbility";

// Minh Thi Phan personal ability
export const useAdd2WildAbility = (ability: InvestigatorAbility) => {
	const { t } = useAppTranslation();

	return usePerInvestigatorAbility({
		title: t`Add wild`,
		ability,
	});
};
