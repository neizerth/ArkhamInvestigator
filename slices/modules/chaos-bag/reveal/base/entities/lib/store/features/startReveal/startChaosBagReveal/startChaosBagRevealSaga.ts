import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import { goToPage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectUnrevealedChaosTokens } from "../../../selectors";
import { openChaosBagRevealConfirm } from "../openChaosBagRevealConfirm";
import { startNewChaosBagReveal } from "../startNewChaosBagReveal/startNewChaosBagReveal";
import { startChaosBagReveal } from "./startChaosBagReveal";

function* worker({ payload }: ReturnType<typeof startChaosBagReveal>) {
	const { tokens = [] } = payload;
	const unrevealedTokens: ReturnType<typeof selectUnrevealedChaosTokens> =
		yield select(selectUnrevealedChaosTokens);

	const count: ReturnType<typeof selectRevealedTokensCount> = yield select(
		selectRevealedTokensCount,
	);

	if (count > 0) {
		yield put(openChaosBagRevealConfirm(payload));
		return;
	}

	const canReveal = unrevealedTokens.length > 0 || tokens.length > 0;

	if (!canReveal) {
		yield put(goToPage(routes.chaosBagPreview));
		return;
	}

	yield put(startNewChaosBagReveal(payload));
}

export function* startChaosBagRevealSaga() {
	yield takeEvery(startChaosBagReveal.match, worker);
}
