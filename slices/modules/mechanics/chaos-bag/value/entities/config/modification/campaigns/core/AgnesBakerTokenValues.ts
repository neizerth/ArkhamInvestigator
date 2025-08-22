import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

export const AgnesBakerTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.AgnesBaker.base]: ({ board }) => {
		const { value, baseValue } = board;
		const horror = Math.max(0, baseValue.sanity - value.sanity);
		return {
			elderSign: horror,
		};
	},
};
