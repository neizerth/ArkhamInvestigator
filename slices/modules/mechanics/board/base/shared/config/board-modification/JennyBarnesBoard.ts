import type { InvesigatorBoardPartial } from "@modules/board/base/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/shared/config";
import type { InvestigatorBoardModification } from "@modules/mechanics/investigator/shared/model";
import { DEFAULT_UPKEEP_RESOURCES_INCREASE } from "../";

const upkeepResourcesIncrease = DEFAULT_UPKEEP_RESOURCES_INCREASE + 1;

const modification: InvesigatorBoardPartial = {
	baseValue: {
		upkeepResourcesIncrease,
	},
	value: {
		upkeepResourcesIncrease,
	},
};

export const JennyBarnesBoard: InvestigatorBoardModification = {
	[InvesigatorCode.JennyBarnes.base]: modification,
	[InvesigatorCode.JennyBarnes.book]: modification,
};
