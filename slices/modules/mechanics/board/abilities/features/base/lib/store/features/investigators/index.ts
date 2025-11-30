import { CampaignAbilityChecker } from "./campaigns";
import { CustomInvestigatorsAbilityChecker } from "./custom";

export const InvestigatorAbilityChecker = {
	...CampaignAbilityChecker,
	...CustomInvestigatorsAbilityChecker,
};
