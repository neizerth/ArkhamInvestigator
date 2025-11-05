import { CoreAbilityChecker } from "./core";
import { TheDunwichLegacyAbilityChecker } from "./dwl";
import { TheCircleUndoneAbilityChecker } from "./tcu";
import { TheForgottenAgeAbilityChecker } from "./tfa";

export const CampaignAbilityChecker = {
	...CoreAbilityChecker,
	...TheDunwichLegacyAbilityChecker,
	...TheCircleUndoneAbilityChecker,
	...TheForgottenAgeAbilityChecker,
};
