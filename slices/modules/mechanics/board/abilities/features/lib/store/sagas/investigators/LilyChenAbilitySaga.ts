import { changeBoardHistoryAbilityUse } from "@modules/board/abilities/shared/lib";
import {
	decreaseBoardActualPropValue,
	increaseBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import { whereId } from "@shared/lib/util";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { takeEvery } from "redux-saga/effects";

type LilyAbility = {
	id: string;
	prop: InvestigatorBoardNumericStat;
};

const lilyAbilities: LilyAbility[] = [
	{
		id: "alignment-of-spirit",
		prop: "willpower",
	},
	{
		id: "quiescence-of-thought",
		prop: "intellect",
	},
	{
		id: "prescience-of-fate",
		prop: "combat",
	},
	{
		id: "balance-of-body",
		prop: "agility",
	},
];

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId, changedAbilities } = payload;

	for (const ability of changedAbilities) {
		const action = ability.isUsed
			? increaseBoardActualPropValue
			: decreaseBoardActualPropValue;

		const item = lilyAbilities.find(whereId(ability.id));

		if (!item) {
			continue;
		}

		const { prop } = item;

		yield action({
			boardId,
			prop,
			value: 1,
			history: {
				type: "update",
				id: payload.item.id,
			},
		});
	}
}

export function* LilyChenAbilitySaga() {
	yield takeEvery(changeBoardHistoryAbilityUse.match, worker);
}
