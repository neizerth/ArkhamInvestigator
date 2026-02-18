import type { InvestigatorBoardModification } from "@modules/mechanics/board/base/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { DEFAULT_ALLY_SLOTS } from "../../../stat";

const allySlots = DEFAULT_ALLY_SLOTS + 3;

export const CharlieKaneBoard: InvestigatorBoardModification = {
	[InvesigatorCode.CharlieKane]: () => ({
		baseValue: {
			allySlots,
		},
		value: {
			allySlots,
		},
	}),
};
