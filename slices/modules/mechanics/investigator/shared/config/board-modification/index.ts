import type { InvestigatorBoardModification } from "../../model";

import { GeorgeBarnabyBoard } from "./GeorgeBarnabyBoard";
import { IsabelleBarnesBoard } from "./IsabelleBarnesBoard";
import { JennyBarnesBoard } from "./JennyBarnesBoard";
import { LilyChenBoard } from "./LilyChenBoard";
import { PatriceHathawayBoard } from "./PatriceHathawayBoard";

export const investigatorBoardModifications: InvestigatorBoardModification = {
	...GeorgeBarnabyBoard,
	...IsabelleBarnesBoard,
	...JennyBarnesBoard,
	...LilyChenBoard,
	...PatriceHathawayBoard,
};
