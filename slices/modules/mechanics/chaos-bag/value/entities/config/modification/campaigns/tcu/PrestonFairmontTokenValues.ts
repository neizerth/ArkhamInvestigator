import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { createAbilityTokenValues } from "@modules/mechanics/chaos-bag/value/shared/lib";
import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

const abilityId = AbilityCode.PrestonFairmont.elderSign;

export const PrestonFairmontTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.PrestonFairmont]: ({ board, boards }) => {
		return createAbilityTokenValues({
			board,
			boards,
			abilityId,
			token: "elderSign",
			value: "success",
		});
	},
};
