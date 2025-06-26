import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { DEFAULT_HAND_SIZE } from "..";
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
