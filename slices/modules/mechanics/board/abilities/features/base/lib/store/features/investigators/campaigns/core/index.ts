import { SkidsOTooleAbilityChecker } from "./SkidsOToole";
import { WendyAdamsAbilityChecker } from "./WendyAdams";

export const CoreAbilityChecker = {
	...SkidsOTooleAbilityChecker,
	...WendyAdamsAbilityChecker,
};
