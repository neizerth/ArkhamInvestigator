import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenValueModification } from "../../../../model";

export const FatherMateoTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.FatherMateo.base]: () => {
		return {
			elderSign: "success",
		};
	},
};
