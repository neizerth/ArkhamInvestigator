import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

export const HenryBigbyTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.HenryBigby]: () => {
		return {
			elderSign: "fail",
		};
	},
};
