import { InvesigatorCode } from "@modules/mechanics/investigator/shared/config";
import type { InvestigatorBoardModification } from "@modules/mechanics/investigator/shared/model";
import { DEFAULT_UPKEEP_RESOURCES_INCREASE } from "../";

const upkeepResourcesIncrease = DEFAULT_UPKEEP_RESOURCES_INCREASE + 1;

export const IsabelleBarnesBoard: InvestigatorBoardModification = {
	[InvesigatorCode.IsabelleBarnes]: {
		baseValue: {
			upkeepResourcesIncrease,
		},
		value: {
			upkeepResourcesIncrease,
		},
	},
};
