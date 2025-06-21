import type { InvestigatorBoardModification } from "@modules/mechanics/investigator/shared/model";
import { GeorgeBarnabyBoard } from "./GeorgeBarnabyBoard";
import { IsabelleBarnesBoard } from "./IsabelleBarnesBoard";
import { JennyBarnesBoard } from "./JennyBarnesBoard";
import { LilyChenBoard } from "./LilyChenBoard";
import { PatriceHathawayBoard } from "./PatriceHathawayBoard";
import { ShatteredSelfBoard } from "./ShatteredSelfBoard";

export const investigatorBoardModifications: InvestigatorBoardModification = {
	...GeorgeBarnabyBoard,
	...IsabelleBarnesBoard,
	...JennyBarnesBoard,
	...LilyChenBoard,
	...PatriceHathawayBoard,
	...ShatteredSelfBoard,
};
