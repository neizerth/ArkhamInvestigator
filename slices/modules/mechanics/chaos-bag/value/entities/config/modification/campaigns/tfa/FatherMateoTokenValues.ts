import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenValueModification } from "../../../../model";

const code = InvesigatorCode.FatherMateo.base;
const abilityId = AbilityCode.FatherMateo.base;

// @TODO
export const FatherMateoTokenValues: InvestigatorTokenValueModification = {
	[code]: ({ board }) => {
		const isUsed = true;
		return {
			autoFail: isUsed ? "fail" : "success",
		};
	},
};
