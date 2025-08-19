import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorBoardModification } from "../../../../model";

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
