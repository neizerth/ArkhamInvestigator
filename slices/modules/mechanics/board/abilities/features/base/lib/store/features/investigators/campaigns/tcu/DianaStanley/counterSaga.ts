import {
	createAbilityValueFilter,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import type { boardAbilityValueSet } from "@modules/board/abilities/shared/lib";
import {
	increaseBoardActualPropValue,
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectCanUseBoardAbility } from "../../../../../selectors";

const filterAction = createAbilityValueFilter(AbilityCode.DianaStanley.counter);

function* worker({ payload }: ReturnType<typeof boardAbilityValueSet>) {
	const { boardId, value, prevValue, historyItem } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	const diff = value - prevValue;

	const willpower = board.value.willpower + diff;

	yield put(
		setBoardActualPropValue({
			boardId,
			prop: "willpower",
			value: willpower,
			history: {
				type: "update",
				id: historyItem.id,
			},
		}),
	);

	if (diff < 1) {
		return;
	}

	const canUseSelector = selectCanUseBoardAbility({
		boardId,
		abilityId: AbilityCode.DianaStanley.reaction,
	});

	const canUse: ReturnType<typeof canUseSelector> =
		yield select(canUseSelector);

	if (!canUse) {
		return;
	}

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId: AbilityCode.DianaStanley.reaction,
			canUse: false,
		}),
	);

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "resources",
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "ability.diana.reaction",
		}),
	);
}

export function* DianaStanleyAbilityCounterSaga() {
	yield takeEvery(filterAction, worker);
}
