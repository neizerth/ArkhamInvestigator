import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

export const IsabelleBarnesTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.IsabelleBarnes.JennysChoice]: ({ board }) => {
		const { value } = board;
		return {
			elderSign: value.resources,
		};
	},
};
