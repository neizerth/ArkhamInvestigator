import type { InvestigatorBoardModification } from "@modules/mechanics/board/base/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { DEFAULT_UPKEEP_RESOURCES_INCREASE } from "../../../stat";

const upkeepResourcesIncrease = DEFAULT_UPKEEP_RESOURCES_INCREASE + 1;

export const IsabelleBarnesBoard: InvestigatorBoardModification = {
	[InvesigatorCode.IsabelleBarnes.JennysChoice]: () => ({
		baseValue: {
			upkeepResourcesIncrease,
		},
		value: {
			upkeepResourcesIncrease,
		},
	}),
};
