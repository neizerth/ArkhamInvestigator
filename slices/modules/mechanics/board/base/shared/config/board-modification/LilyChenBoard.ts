import { InvesigatorCode } from "@modules/mechanics/investigator/shared/config";
import type { InvestigatorBoardModification } from "@modules/mechanics/investigator/shared/model";

export const LilyChenBoard: InvestigatorBoardModification = {
	[InvesigatorCode.LilyChen]: {
		usedAbilities: [
			{
				id: "alignment-of-spirit",
			},
			{
				id: "quiescence-of-thought",
			},
			{
				id: "prescience-of-fate",
			},
			{
				id: "balance-of-body",
			},
		],
	},
};
