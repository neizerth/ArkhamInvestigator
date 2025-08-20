import type { InvestigatorBoardModification } from "@modules/mechanics/board/base/shared/model";
import { WendyAdamsBoard } from "./WendyAdamsBoard";

export const CoreBoardModification: InvestigatorBoardModification = {
	...WendyAdamsBoard,
};
