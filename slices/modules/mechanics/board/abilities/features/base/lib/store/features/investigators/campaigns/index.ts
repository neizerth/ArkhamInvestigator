import { CoreAbilityChecker } from "./core";
import { TheDunwichLegacyAbilityChecker } from "./dwl";

export const CampaignAbilityChecker = {
	...TheDunwichLegacyAbilityChecker,
	...CoreAbilityChecker,
};
