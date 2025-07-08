import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorBoardModification } from "../../model";
import { DEFAULT_UPKEEP_RESOURCES_INCREASE } from "../stat";

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
