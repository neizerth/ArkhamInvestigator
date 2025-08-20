import type { InvestigatorBoardModification } from "../../../../shared/model";
import { JennysChoiceBoardModification } from "./zjc";

export const CustomBoardModification: InvestigatorBoardModification = {
	...JennysChoiceBoardModification,
};
