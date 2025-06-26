import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
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
