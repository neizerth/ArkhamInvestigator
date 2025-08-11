import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenValueModification } from "../../../../model";

export const MarkHarriganTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.MarkHarrigan]: ({ board }) => {
		const { value, baseValue } = board;
		const damage = Math.max(0, baseValue.health - value.health);
		return {
			elderSign: damage,
		};
	},
};
