import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { createAbilityTokenValues } from "@modules/mechanics/chaos-bag/value/shared/lib";
import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

const abilityId = AbilityCode.DanielaReyes;

export const DanielaReyesTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.DanielaReyes]: ({ board, boards }) => {
		return createAbilityTokenValues({
			board,
			boards,
			abilityId,
			token: "elderSign",
			value: "success",
		});
	},
};
