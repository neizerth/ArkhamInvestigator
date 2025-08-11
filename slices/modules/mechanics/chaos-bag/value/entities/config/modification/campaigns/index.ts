import { CoreTokenValues } from "./core";
import { TheDunwichLegacyTokenValues } from "./dwl";
import { ThePathToCarcosaTokenValues } from "./ptc";
import { TheForgottenAgeTokenValues } from "./tfa";

export const CampaignTokenValues = {
	...CoreTokenValues,
	...TheDunwichLegacyTokenValues,
	...ThePathToCarcosaTokenValues,
	...TheForgottenAgeTokenValues,
};
