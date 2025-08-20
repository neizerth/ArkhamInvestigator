import { changeBoardHistoryAbilityUse } from "@modules/board/abilities/shared/lib";
import {
	decreaseBoardActualPropValue,
	increaseBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { whereId } from "@shared/lib/util";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { put, takeEvery } from "redux-saga/effects";

type LilyAbility = {
	id: string;
	prop: InvestigatorBoardNumericStat;
};

const lilyAbilities: LilyAbility[] = [
	{
		id: AbilityCode.LilyChen.willpower,
		prop: "willpower",
	},
	{
		id: AbilityCode.LilyChen.intellect,
		prop: "intellect",
	},
	{
		id: AbilityCode.LilyChen.combat,
		prop: "combat",
	},
	{
		id: AbilityCode.LilyChen.agility,
		prop: "agility",
	},
];

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId, changedAbilities } = payload;

	for (const ability of changedAbilities) {
		const action = ability.isUsed
			? decreaseBoardActualPropValue
			: increaseBoardActualPropValue;

		const item = lilyAbilities.find(whereId(ability.id));

		if (!item) {
			continue;
		}

		const { prop } = item;

		yield put(
			action({
				boardId,
				prop,
				value: 1,
				history: {
					type: "update",
					id: payload.item.id,
				},
			}),
		);
	}
}

export function* LilyChenAbilitySaga() {
	yield takeEvery(changeBoardHistoryAbilityUse.match, worker);
}
