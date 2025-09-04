import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

export const BeastWithinTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.BeastWithin]: () => {
		return {
			elderSign: "fail",
		};
	},
};
