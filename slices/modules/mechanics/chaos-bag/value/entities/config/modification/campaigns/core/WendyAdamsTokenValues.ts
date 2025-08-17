import {
	getBoardAbility,
	getBoardUsedAbility,
} from "@modules/board/abilities/shared/lib/store/getters";
import { getIsBoardAbilityUsed } from "@modules/board/abilities/shared/lib/store/getters/getIsBoardAbilityUsed";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import type { InvestigatorTokenValueModification } from "../../../../model";

const abilityId = AbilityCode.WendyAdams;

export const WendyAdamsTokenValues: InvestigatorTokenValueModification = {
	[InvesigatorCode.WendyAdams.base]: ({ board, boards }) => {
		const ability = getBoardAbility({
			abilityId,
			board,
		});

		const usedAbility = getBoardUsedAbility({
			board,
			abilityId,
		});

		const isUsed = getIsBoardAbilityUsed({
			ability,
			usedAbility,
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
