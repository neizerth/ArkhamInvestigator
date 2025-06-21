import { InvesigatorCode } from "@modules/mechanics/investigator/shared/config";
import type { InvestigatorBoardModification } from "@modules/mechanics/investigator/shared/model";

export const GeorgeBarnabyBoard: InvestigatorBoardModification = {
	[InvesigatorCode.GeorgeBarnaby]: {
		initialValue: {
			handSize: 0,
		},
		baseValue: {
			handSize: 0,
		},
		value: {
			handSize: 0,
		},
	},
};
