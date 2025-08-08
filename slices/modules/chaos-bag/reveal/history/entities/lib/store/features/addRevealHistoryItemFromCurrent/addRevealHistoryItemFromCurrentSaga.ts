import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import { selectSkillCheckResult } from "@modules/chaos-bag/result/features/lib";
import { selectChaosBagSucceedBy } from "@modules/chaos-bag/reveal/base/shared/lib";
import {
	addRevealHistoryItem,
	selectCurrentRevealHistoryItem,
	setCurrentRevealHistoryItem,
} from "@modules/chaos-bag/reveal/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectCanAddRevealHistoryItem } from "../../selectors";
import { addRevealHistoryItemFromCurrent } from "./addRevealHistoryItemFromCurrent";

function* worker() {
	const item: ReturnType<typeof selectCurrentRevealHistoryItem> = yield select(
		selectCurrentRevealHistoryItem,
	);

	const canAdd: ReturnType<typeof selectCanAddRevealHistoryItem> = yield select(
		selectCanAddRevealHistoryItem,
	);

	if (!item || !canAdd) {
		return;
	}

	const difficulty: ReturnType<typeof selectSkillCheckDifficulty> =
		yield select(selectSkillCheckDifficulty);
	const difficultyType: ReturnType<typeof selectSkillCheckDifficultyType> =
		yield select(selectSkillCheckDifficultyType);

	const result: ReturnType<typeof selectSkillCheckResult> = yield select(
		selectSkillCheckResult,
	);
	const succeedBy: ReturnType<typeof selectChaosBagSucceedBy> = yield select(
		selectChaosBagSucceedBy,
	);

	const data: ChaosBagHistoryItem = {
		...item,
		difficulty,
		difficultyType,
		result,
		succeedBy,
	};

	yield put(addRevealHistoryItem(data));
	yield put(setCurrentRevealHistoryItem(null));
}

export function* addRevealHistoryItemFromCurrentSaga() {
	yield takeEvery(addRevealHistoryItemFromCurrent.match, worker);
}
