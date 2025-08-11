import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenValueModification } from "../../../../../model";

export const IsabelleBarnesTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.IsabelleBarnes]: ({ board }) => {
		const { value } = board;
		return {
			elderSign: value.resources,
		};
	},
};
