import type { InvesigatorBoardPartial } from "@modules/board/base/shared/model";
import type { InvestigatorBoardModification } from "@modules/mechanics/board/base/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { DEFAULT_UPKEEP_RESOURCES_INCREASE } from "../../../stat";

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
	[InvesigatorCode.JennyBarnes.base]: () => modification,
	[InvesigatorCode.JennyBarnes.book]: () => modification,
};
