import { selectChaosBagTokenById } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { createRevealedToken } from "../../../logic";
import { revealChaosTokens } from "../revealChaosTokens";
import { startChaosBagReveal } from "../startReveal";
import { revealChaosTokenById } from "./revealChaosTokenById";

function* worker({ payload }: ReturnType<typeof revealChaosTokenById>) {
	const { id, boardId } = payload;

	const tokenSelector = selectChaosBagTokenById(id);
	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	const valuesSelector = selectChaosBagTokenValues(boardId);

	const values: ReturnType<typeof valuesSelector> =
		yield select(valuesSelector);
	const value = values[token.type];

	const count: ReturnType<typeof selectRevealedTokensCount> = yield select(
		selectRevealedTokensCount,
	);

	const revealedToken = createRevealedToken({
		...token,
		value,
	});

	const tokens = [revealedToken];

	if (count === 0) {
		yield put(
			startChaosBagReveal({
				...payload,
				tokens,
			}),
		);
	} else {
		yield put(revealChaosTokens({ boardId, tokens }));
		yield put(openChaosTokenRevealModal());
	}
}

export function* revealChaosTokenByIdSaga() {
	yield takeEvery(revealChaosTokenById.match, worker);
}
