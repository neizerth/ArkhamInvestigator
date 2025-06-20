import { DEFAULT_HAND_SIZE, InvesigatorCode } from "../../config";
import type { InvestigatorBoardModification } from "../../model";

const handSize = DEFAULT_HAND_SIZE - 3;

export const PatriceHathawayBoard: InvestigatorBoardModification = {
	[InvesigatorCode.PatriceHathaway]: {
		baseValue: {
			handSize,
		},
		value: {
			handSize,
		},
	},
};
