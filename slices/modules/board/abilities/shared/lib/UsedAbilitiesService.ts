import { whereId } from "@shared/lib/util";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { equals, isNotNil, reject } from "ramda";
import type { InvestigatorBoardUsedAbility } from "../model";

type UseOptions = {
	boardId?: number;
	ability: InvestigatorAbility;
	usedAbilities?: InvestigatorBoardUsedAbility[];
};

export const UsedAbilitiesService = {
	resetAbilityUse({ boardId, ability, usedAbilities = [] }: UseOptions) {
		const abilityUseData = usedAbilities.find(whereId(ability.id));

		const data = reject(whereId(ability.id), usedAbilities);

		if (!ability.perInvestigator || boardId) {
			return data;
		}

		const boardIds = reject(equals(boardId), abilityUseData?.boardIds || []);

		if (boardIds.length === 0) {
			return data;
		}

		const item = {
			id: ability.id,
			boardIds,
		};

		return [...data, item];
	},
	setAbilityUsed({ ability, boardId, usedAbilities = [] }: UseOptions) {
		if (ability.perInvestigator && boardId === undefined) {
			return usedAbilities;
		}
		const { id } = ability;

		const index = usedAbilities.findIndex(whereId(id));

		if (!ability.perInvestigator) {
			return [...usedAbilities, { id }];
		}

		if (!boardId) {
			return;
		}

		if (index === -1) {
			const item = {
				id,
				boardIds: [boardId],
			};

			return [...usedAbilities, item];
		}

		const usedData = usedAbilities[index];

		const boardIds = usedData?.boardIds || [];

		const item = {
			id,
			boardIds: [...boardIds, boardId].filter(isNotNil),
		};

		return usedAbilities.with(index, item);
	},
};
