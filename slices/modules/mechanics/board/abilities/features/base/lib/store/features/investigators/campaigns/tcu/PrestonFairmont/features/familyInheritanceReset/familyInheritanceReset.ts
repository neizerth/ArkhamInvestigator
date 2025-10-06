import {
	processBoardCounterSpecialAction,
	selectBoardAbilityValue,
	setBoardAbilityValue,
} from "@modules/board/abilities/shared/lib";
import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { createBoardHistoryGroup } from "@modules/board/history/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const abilityId = AbilityCode.PrestonFairmont.familyInheritance;

const filterAction = (action: unknown) => {
	if (!processBoardCounterSpecialAction.match(action)) {
		return false;
	}

	return action.payload.abilityId === abilityId;
};

function* worker({
	payload,
}: ReturnType<typeof processBoardCounterSpecialAction>) {
	const { boardId, abilityId } = payload;

	const valueSelector = selectBoardAbilityValue({
		boardId,
		abilityId,
	});

	const value: ReturnType<typeof valueSelector> = yield select(valueSelector);

	if (value === 0) {
		return;
	}

	const history = createBoardHistoryGroup();

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "resources",
			value,
			history,
		}),
	);

	yield put(
		setBoardAbilityValue({
			boardId,
			abilityId,
			value: 0,
			history,
		}),
	);
}

export function* PrestonFairmontFamilyInheritanceReset() {
	yield takeEvery(filterAction, worker);
}
