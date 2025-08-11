import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenValueModification } from "../../../../model";

export const AgnesBakerTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.AgnesBaker]: ({ board }) => {
		const { value, baseValue } = board;
		const horror = Math.max(0, baseValue.sanity - value.sanity);
		return {
			elderSign: horror,
		};
	},
};
