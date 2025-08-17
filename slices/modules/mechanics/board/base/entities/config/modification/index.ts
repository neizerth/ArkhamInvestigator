import type { InvestigatorBoardModification } from "../../model";
import { CalwinWrightBoard } from "./CalwinWrightBoard";
import { GeorgeBarnabyBoard } from "./GeorgeBarnabyBoard";
import { IsabelleBarnesBoard } from "./IsabelleBarnesBoard";
import { JennyBarnesBoard } from "./JennyBarnesBoard";
import { LilyChenBoard } from "./LilyChenBoard";
import { PatriceHathawayBoard } from "./PatriceHathawayBoard";
import { ShatteredSelfBoard } from "./ShatteredSelfBoard";
import { WendyAdamsBoard } from "./WendyAdamsBoard";

export const investigatorBoardModifications: InvestigatorBoardModification = {
	...GeorgeBarnabyBoard,
	...IsabelleBarnesBoard,
	...JennyBarnesBoard,
	...LilyChenBoard,
	...PatriceHathawayBoard,
	...ShatteredSelfBoard,
	...CalwinWrightBoard,
	...WendyAdamsBoard,
};
