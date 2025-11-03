import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import {
	addRevealHistoryItem,
	setCurrentRevealHistoryItem,
} from "@modules/chaos-bag/reveal/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { payload } = action;
	return (
		payload.allRevealedTokens.length > 0 && Boolean(payload.skillCheckBoardId)
	);
};

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const {
		turnId,
		allRevealedTokens: tokens,
		skillCheckTitle: title,
		skillValue: skillCheckValue,
		skillCheckBoardId: boardId,
		skillCheckType,
		succeedBy,
		skillCheckExpression,
		result,
		failed,
	} = payload;

	if (!boardId) {
		return;
	}

	const difficulty: ReturnType<typeof selectSkillCheckDifficulty> =
		yield select(selectSkillCheckDifficulty);
	const difficultyType: ReturnType<typeof selectSkillCheckDifficultyType> =
		yield select(selectSkillCheckDifficultyType);

	const data: ChaosBagHistoryItem = {
		boardId,
		turnId,
		id: v4(),
		tokens,
		title,
		result,
		skillCheckType,
		skillCheckExpression,
		skillCheckValue,
		difficulty,
		difficultyType,
		succeedBy,
		failed,
		date: Date(),
	};

	yield put(addRevealHistoryItem(data));
	yield put(setCurrentRevealHistoryItem(null));
}

export function* addRevealHistoryItemFromCurrentSaga() {
	yield takeEvery(filterAction, worker);
}
