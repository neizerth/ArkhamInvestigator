import type { InvestigatorBoardModification } from "../../../shared/model";
import { CampaignBoardModification } from "./campaign";
import { CustomBoardModification } from "./custom";

export const investigatorBoardModifications: InvestigatorBoardModification = {
	...CampaignBoardModification,
	...CustomBoardModification,
};
