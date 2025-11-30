import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { spendResources } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { createBoardHistoryGroup } from "@modules/board/history/shared/lib";
import { setSkillCheckDifficulty } from "@modules/board/skill-check/shared/lib";
import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { startResourcesTest } from "./startResourcesTest";

function* worker({ payload }: ReturnType<typeof startResourcesTest>) {
	const { count = 0, boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { turnId } = board;

	const history = createBoardHistoryGroup();

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId: AbilityCode.SkidsOToole.parallel,
			canUse: false,
			force: true,
			history,
		}),
	);

	yield put(setSkillCheckDifficulty(count));

	yield put(
		startChaosBagReveal({
			boardId,
			turnId,
			value: 3,
			data: {
				abilityId: AbilityCode.SkidsOToole.parallel,
				resourcesCount: count,
			},
		}),
	);

	yield put(
		spendResources({
			boardId,
			value: count,
			history,
		}),
	);
}

export function* ParallelSkidsOTooleStartResourcesTestSaga() {
	yield takeEvery(startResourcesTest.match, worker);
}
