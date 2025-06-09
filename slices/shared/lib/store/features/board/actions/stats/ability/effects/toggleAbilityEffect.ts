import type { AppThunk, InvestigatorBoardStat } from "@shared/model";
import { prop } from "ramda";
import { whereId } from "../../../../../../../util";
import { setShowFactionSelect } from "../../../../board";
import { decreaseCurrentStat, increaseCurrentStat } from "../../current";

type Options = {
	abilityId: string;
	isUsed: boolean;
};

type LilyAbility = {
	id: string;
	stat: InvestigatorBoardStat;
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
		// Lola Hayes
		if (!isUsed && abilityId === "role-switch") {
			dispatch(setShowFactionSelect(true));
			return;
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
