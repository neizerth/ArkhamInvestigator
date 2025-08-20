import { CoreTokenValues } from "./core";
import { TheDunwichLegacyTokenValues } from "./dwl";
import { EdgeOfTheEarthTokenValues } from "./eoe";
import { ThePathToCarcosaTokenValues } from "./ptc";
import { TheCircleUndoneTokenValues } from "./tcu";
import { TheForgottenAgeTokenValues } from "./tfa";
import { TheScarletKeysTokenValues } from "./tsk";

export const CampaignTokenValues = {
	...CoreTokenValues,
	...TheDunwichLegacyTokenValues,
	...ThePathToCarcosaTokenValues,
	...TheForgottenAgeTokenValues,
	...EdgeOfTheEarthTokenValues,
	...TheScarletKeysTokenValues,
	...TheCircleUndoneTokenValues,
};
