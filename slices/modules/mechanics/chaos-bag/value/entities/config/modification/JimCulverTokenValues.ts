import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenValueModification } from "../../model";

export const JimCulverTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.JimCulver.base]: () => {
		return {
			skull: 0,
		};
	},
};
