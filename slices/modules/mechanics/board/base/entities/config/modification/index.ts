import type { InvestigatorBoardModification } from "../../model";
import { CampaignBoardModification } from "./campaign";
import { CustomBoardModification } from "./custom";

export const investigatorBoardModifications: InvestigatorBoardModification = {
	...CampaignBoardModification,
	...CustomBoardModification,
};
