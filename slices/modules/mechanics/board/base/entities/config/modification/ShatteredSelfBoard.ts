import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { DEFAULT_HAND_SIZE } from "..";
import type { InvestigatorBoardModification } from "../../model";

const handSize = DEFAULT_HAND_SIZE - 3;

export const ShatteredSelfBoard: InvestigatorBoardModification = {
	[InvesigatorCode.ShatteredSelf]: {
		baseValue: {
			handSize,
		},
		value: {
			handSize,
		},
	},
};
