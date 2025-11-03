import { CoreAbilityChecker } from "./core";
import { TheDunwichLegacyAbilityChecker } from "./dwl";
import { TheCircleUndoneAbilityChecker } from "./tcu";

export const CampaignAbilityChecker = {
	...TheDunwichLegacyAbilityChecker,
	...CoreAbilityChecker,
	...TheCircleUndoneAbilityChecker,
};
