import type { InvestigatorBoardModification } from "@modules/mechanics/board/base/shared/model";
import { JennyBarnesBoard } from "./JennyBarnesBoard";

export const TheDunwichLegacyBoardModification: InvestigatorBoardModification =
	{
		...JennyBarnesBoard,
	};
