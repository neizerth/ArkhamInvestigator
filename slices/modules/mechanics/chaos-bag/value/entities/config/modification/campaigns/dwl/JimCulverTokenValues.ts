import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

export const JimCulverTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.JimCulver.base]: () => {
		return {
			skull: 0,
		};
	},
};
