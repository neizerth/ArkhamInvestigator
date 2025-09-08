import { selectIsChaosBagEmpty } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import { routes } from "@shared/config";
import { goToPage } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { openChaosBagRevealConfirm } from "../openChaosBagRevealConfirm";
import { startNewChaosBagReveal } from "../startNewChaosBagReveal/startNewChaosBagReveal";
import { startChaosBagReveal } from "./startChaosBagReveal";

function* worker({ payload }: ReturnType<typeof startChaosBagReveal>) {
	const isEmpty: ReturnType<typeof selectIsChaosBagEmpty> = yield select(
		selectIsChaosBagEmpty,
	);

	if (isEmpty) {
		yield put(goToPage(routes.chaosBagPreview));
		return;
	}

	const count: ReturnType<typeof selectRevealedTokensCount> = yield select(
		selectRevealedTokensCount,
	);

	if (count === 0) {
		yield put(startNewChaosBagReveal(payload));
		return;
	}

	yield put(openChaosBagRevealConfirm(payload));
}

export function* startChaosBagRevealSaga() {
	yield takeEvery(startChaosBagReveal.match, worker);
}
