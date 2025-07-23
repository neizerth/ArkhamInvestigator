import { selectBoardId } from "@modules/board/base/shared/lib";
import { selectIsChaosBagEmpty } from "@modules/chaos-bag/base/shared/lib";
import { startChaosBagRevealInternal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { routes } from "@shared/config";
import { goToPage } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { revealChaosTokens } from "../revealChaosTokens";
import { startChaosBagReveal } from "./startChaosBagReveal";

function* worker({ payload }: ReturnType<typeof startChaosBagReveal>) {
	const isEmpty: ReturnType<typeof selectIsChaosBagEmpty> = yield select(
		selectIsChaosBagEmpty,
	);

	const boardIdSelector = selectBoardId(payload.boardId);
	const boardId: ReturnType<typeof boardIdSelector> =
		yield select(boardIdSelector);

	if (isEmpty) {
		yield put(goToPage(routes.chaosBagPreview));
		return;
	}

	yield put(
		startChaosBagRevealInternal({
			...payload,
			boardId,
		}),
	);

	yield put(
		revealChaosTokens({
			boardId,
			count: 1,
		}),
	);
}

export function* startChaosBagRevealSaga() {
	yield takeEvery(startChaosBagReveal.match, worker);
}
