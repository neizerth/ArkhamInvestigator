import { InvesigatorCode } from "@modules/mechanics/investigator/shared/config";
import type { InvestigatorBoardModification } from "@modules/mechanics/investigator/shared/model";
import { DEFAULT_HAND_SIZE } from "..";

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
