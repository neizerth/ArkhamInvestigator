import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenValueModification } from "../../../../../model";

export const HenryBigbyTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.HenryBigby]: () => {
		return {
			elderSign: "fail",
		};
	},
};
