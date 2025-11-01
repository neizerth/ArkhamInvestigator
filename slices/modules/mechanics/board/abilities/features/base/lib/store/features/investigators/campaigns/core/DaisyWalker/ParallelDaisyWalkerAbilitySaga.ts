import {
	type boardAbilityValueSet,
	createAbilityValueFilter,
} from "@modules/board/abilities/shared/lib";
import { selectBoardById, setBoardPart } from "@modules/board/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityValueFilter(AbilityCode.DaisyWalker.parallel);

function* worker({ payload }: ReturnType<typeof boardAbilityValueSet>) {
	const { boardId, value, prevValue } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const diff = value - prevValue;

	if (diff === 0) {
		return;
	}

	const baseWillpower = board.baseValue.willpower + diff;
	const willpower = board.value.willpower + diff;

	const baseSanity = board.baseValue.sanity + diff;
	const sanity = board.value.sanity + diff;

	yield put(
		setBoardPart({
			boardId,
			data: {
				baseValue: {
					sanity: baseSanity,
					willpower: baseWillpower,
				},
				value: {
					willpower,
					sanity,
				},
			},
		}),
	);
}

export function* ParallelDaisyWalkerAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
