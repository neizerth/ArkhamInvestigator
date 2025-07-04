import { selectBoardById } from "@modules/board/base/shared/lib";
import { getStatDiffExpression } from "@modules/board/skill-check/shared/lib";
import {
	selectChaosBagSkillCheckType,
	setChaosBagSkillCheckExpression,
	setChaosBagSkillCheckTitle,
	setChaosBagSkillValue,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	customChaosBagSkillValueSet,
	setCustomChaosBagSkillValue,
} from "../../actions";

function* worker({ payload }: ReturnType<typeof setCustomChaosBagSkillValue>) {
	const { boardId, value } = payload;

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	const statType: ReturnType<typeof selectChaosBagSkillCheckType> =
		yield select(selectChaosBagSkillCheckType);

	if (!board) {
		return;
	}

	yield put(setChaosBagSkillValue(value));
	yield put(setChaosBagSkillCheckTitle(null));

	if (!statType) {
		yield put(setChaosBagSkillCheckExpression([]));
		return;
	}

	const statValue = board.value[statType];

	const expression = getStatDiffExpression({
		statType,
		statValue,
		value,
	});

	yield put(setChaosBagSkillCheckExpression(expression));

	yield put(
		customChaosBagSkillValueSet({
			...payload,
			skillCheckExpression: expression,
		}),
	);
}

export function* setCustomChaosBagSkillValueSaga() {
	yield takeEvery(setCustomChaosBagSkillValue.match, worker);
}
