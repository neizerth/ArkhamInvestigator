import { selectCurrentBoard, setShowFactionSelect } from "@shared/lib";
import type { AppThunk, InvestigatorBoardNumericStat } from "@shared/model";
import { prop } from "ramda";
import {
	decreaseCurrentStat,
	increaseCurrentStat,
} from "../../../../../shared/lib/store/features/board/actions/stats/current";
import { whereId } from "../../../../../shared/lib/util";
import { addBlessTokenEffect } from "./addBlessTokenEffect";

type Options = {
	abilityId: string;
	isUsed: boolean;
};

type LilyAbility = {
	id: string;
	stat: InvestigatorBoardNumericStat;
};

const lilyAbilities: LilyAbility[] = [
	{
		id: "alignment-of-spirit",
		stat: "willpower",
	},
	{
		id: "quiescence-of-thought",
		stat: "intellect",
	},
	{
		id: "prescience-of-fate",
		stat: "combat",
	},
	{
		id: "balance-of-body",
		stat: "agility",
	},
];

const lilyIds = lilyAbilities.map(prop("id"));

export const toggleAbilityEffect =
	({ abilityId, isUsed }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);
		// Lola Hayes
		if (!isUsed && abilityId === "role-switch") {
			dispatch(setShowFactionSelect(true));
			return;
		}
		// Sister Mary, parallel Zoey Samaras
		if (!isUsed && abilityId === "add-bless") {
			dispatch(addBlessTokenEffect(1));
		}
		// Lily Chen
		if (lilyIds.includes(abilityId)) {
			const item = lilyAbilities.find(whereId(abilityId));
			if (!item) {
				return;
			}

			const action = isUsed
				? increaseCurrentStat(item.stat)
				: decreaseCurrentStat(item.stat);

			dispatch(action);
			return;
		}
	};
