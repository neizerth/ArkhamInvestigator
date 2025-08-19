import type { InvestigatorBoardModification } from "../../../model";
import { JennysChoiceBoardModification } from "./zjc";

export const CustomBoardModification: InvestigatorBoardModification = {
	...JennysChoiceBoardModification,
};
