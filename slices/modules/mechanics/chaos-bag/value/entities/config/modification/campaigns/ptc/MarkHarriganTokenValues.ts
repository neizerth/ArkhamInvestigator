import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

export const MarkHarriganTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.MarkHarrigan]: ({ board }) => {
		const { value, baseValue } = board;
		const damage = Math.max(0, baseValue.health - value.health);
		return {
			elderSign: damage,
		};
	},
};
