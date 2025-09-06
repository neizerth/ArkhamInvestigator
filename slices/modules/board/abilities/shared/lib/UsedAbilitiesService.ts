import { whereId } from "@shared/lib/util";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { equals, isNotNil, reject } from "ramda";
import type { InvestigatorBoardUsedAbility } from "../model";

type UseOptions = {
	boardId?: number;
	targetBoardId?: number;
	ability: InvestigatorAbility;
	usedAbilities?: InvestigatorBoardUsedAbility[];
	boardsCount: number;
	active?: boolean;
};

export const UsedAbilitiesService = {
	resetAbilityUse({ targetBoardId, ability, usedAbilities = [] }: UseOptions) {
		const abilityUseData = usedAbilities.find(whereId(ability.id));

		const data = reject(whereId(ability.id), usedAbilities);

		if (!ability.perInvestigator || targetBoardId) {
			return data;
		}

		if (!abilityUseData?.boardIds) {
			return;
		}

		const boardIds = reject(equals(targetBoardId), abilityUseData.boardIds);

		const item: InvestigatorBoardUsedAbility = {
			id: ability.id,
			boardIds,
			active: false,
		};

		return [...data, item];
	},
	setAbilityUsed(options: UseOptions) {
		const {
			ability,
			active,
			usedAbilities = [],
			boardsCount,
			boardId,
		} = options;

		if (
			ability.perInvestigator &&
			options.targetBoardId === undefined &&
			boardsCount > 1
		) {
			return usedAbilities;
		}

		const { id } = ability;

		const index = usedAbilities.findIndex(whereId(id));

		if (!ability.perInvestigator) {
			return [...usedAbilities, { id }];
		}

		if (!options.targetBoardId && boardsCount > 1) {
			return;
		}

		const targetBoardId =
			boardsCount === 1
				? (options.targetBoardId ?? boardId)
				: options.targetBoardId;

		if (!targetBoardId) {
			return;
		}

		if (index === -1) {
			const item: InvestigatorBoardUsedAbility = {
				id,
				boardIds: [targetBoardId],
				active,
			};

			return [...usedAbilities, item];
		}

		const usedData = usedAbilities[index];

		const boardIds = usedData?.boardIds || [];

		const item: InvestigatorBoardUsedAbility = {
			id,
			boardIds: [...boardIds, targetBoardId].filter(isNotNil),
			active,
		};

		return usedAbilities.with(index, item);
	},
};
