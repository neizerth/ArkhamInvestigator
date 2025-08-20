import { getIsBoardAbilityUsed } from "@modules/board/abilities/shared/lib/store/getters";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import type { InvestigatorTokenValueModification } from "@modules/mechanics/chaos-bag/value/shared/model";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";

const abilityId = AbilityCode.WendyAdams;

export const WendyAdamsTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.WendyAdams.base]: ({ board, boards }) => {
		const isUsed = getIsBoardAbilityUsed({
			board,
			abilityId,
			boardsCount: boards.length,
		});

		if (isUsed) {
			return {};
		}

		return {
			elderSign: "success",
		};
	},
};
