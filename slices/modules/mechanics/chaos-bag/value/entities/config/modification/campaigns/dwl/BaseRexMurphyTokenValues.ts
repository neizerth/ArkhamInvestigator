import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { createAbilityTokenValues } from "@modules/mechanics/chaos-bag/value/shared/lib";
import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

const abilityId = AbilityCode.RexMurphy.base;

export const BaseRexMurphyTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.RexMurphy.base]: ({ board, boards }) => {
		return createAbilityTokenValues({
			board,
			boards,
			abilityId,
			token: "elderSign",
			value: "fail",
		});
	},
};
