import type { InvestigatorBoardModification } from "@modules/mechanics/board/base/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

export const GeorgeBarnabyBoard: InvestigatorBoardModification = {
	[InvesigatorCode.GeorgeBarnaby]: () => ({
		initialValue: {
			handSize: 0,
		},
		baseValue: {
			handSize: 0,
		},
		value: {
			handSize: 0,
		},
	}),
};
