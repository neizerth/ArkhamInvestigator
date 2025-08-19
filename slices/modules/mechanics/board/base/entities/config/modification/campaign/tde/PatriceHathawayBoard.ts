import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorBoardModification } from "../../../../model";
import { DEFAULT_HAND_SIZE } from "../../../stat";

const handSize = DEFAULT_HAND_SIZE - 3;

export const PatriceHathawayBoard: InvestigatorBoardModification = {
	[InvesigatorCode.PatriceHathaway]: () => ({
		baseValue: {
			handSize,
		},
		value: {
			handSize,
		},
	}),
};
