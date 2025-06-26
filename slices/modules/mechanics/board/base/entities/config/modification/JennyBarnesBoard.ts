import type { InvesigatorBoardPartial } from "@modules/board/base/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { DEFAULT_UPKEEP_RESOURCES_INCREASE } from "..";
import type { InvestigatorBoardModification } from "../../model";

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
