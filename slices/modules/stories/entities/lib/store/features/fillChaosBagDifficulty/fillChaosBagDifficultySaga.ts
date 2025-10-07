import { createChaosBag } from "@modules/chaos-bag/base/entities/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { selectStoryDifficultyById } from "@modules/stories/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { fillChaosBagDifficulty } from "./fillChaosBagDifficulty";

function* worker({ payload }: ReturnType<typeof fillChaosBagDifficulty>) {
	const { difficultyId } = payload;

	const difficultySelector = selectStoryDifficultyById(difficultyId);
	const difficulty: ReturnType<typeof difficultySelector> =
		yield select(difficultySelector);

	if (!difficulty) {
		return;
	}

	const tokenCount = difficulty.tokens.reduce(
		(total, type) => {
			const value = total[type] || 0;

			total[type] = value + 1;

			return total;
		},
		{} as Partial<Record<ChaosTokenType, number>>,
	);

	yield put(createChaosBag({ tokenCount }));
}

export function* fillChaosBagDifficultySaga() {
	yield takeEvery(fillChaosBagDifficulty.match, worker);
}
