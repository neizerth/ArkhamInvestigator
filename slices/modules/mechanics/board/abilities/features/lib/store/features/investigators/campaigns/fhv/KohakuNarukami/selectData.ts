import {
	selectCanAddChaosToken,
	selectChaosTokenCountByType,
} from "@modules/chaos-bag/base/entities/lib";
import { select } from "redux-saga/effects";

export type SelectDataReturnType = {
	canRemove2Tokens: boolean;
	canAddBless: boolean;
	canAddCurse: boolean;
	canRemove2Bless: boolean;
	canRemove2Curse: boolean;
	blessCount: number;
	curseCount: number;
};

export function* selectData() {
	const canAddBlessSelector = selectCanAddChaosToken("bless");
	const canAddCurseSelector = selectCanAddChaosToken("curse");

	const canAddBless: ReturnType<typeof canAddBlessSelector> =
		yield select(canAddBlessSelector);
	const canAddCurse: ReturnType<typeof canAddCurseSelector> =
		yield select(canAddCurseSelector);

	const blessCountSelector = selectChaosTokenCountByType("bless");
	const curseCountSelector = selectChaosTokenCountByType("curse");

	const blessCount: number = yield select(blessCountSelector);
	const curseCount: number = yield select(curseCountSelector);

	const canRemove2Bless = blessCount > 1;
	const canRemove2Curse = curseCount > 1;

	const sameCount = blessCount === curseCount;

	const addBlessAbility =
		(sameCount || blessCount < curseCount) && canAddBless.canAdd;
	const addCurseAbility =
		(sameCount || curseCount < blessCount) && canAddCurse.canAdd;

	const canRemove2Tokens = canRemove2Bless && canRemove2Curse;

	const data: SelectDataReturnType = {
		canRemove2Tokens,
		canAddBless: addBlessAbility,
		canAddCurse: addCurseAbility,
		canRemove2Bless,
		canRemove2Curse,
		blessCount,
		curseCount,
	};

	return data;
}
