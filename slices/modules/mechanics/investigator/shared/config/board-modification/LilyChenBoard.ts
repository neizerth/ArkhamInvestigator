import { InvesigatorCode } from "..";
import type { InvestigatorBoardModification } from "../../model";

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
