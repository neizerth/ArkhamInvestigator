import { unsealChaosToken } from "@modules/chaos-bag/base/entities/lib";
import {
	chaosBagUpdated,
	selectChaosBagTokenById,
} from "@modules/chaos-bag/base/shared/lib";
import {
	addRevealedTokens,
	selectRevealedTokensCount,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { startChaosBagReveal } from "../startReveal";
import { resolveChaosToken } from "./resolveChaosToken";

function* worker({ payload }: ReturnType<typeof resolveChaosToken>) {
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

	if (token.sealed) {
		yield put(unsealChaosToken(payload));
		yield put(chaosBagUpdated({ boardId }));
	}

	const count: ReturnType<typeof selectRevealedTokensCount> = yield select(
		selectRevealedTokensCount,
	);

	const revealedToken: RevealedChaosBagToken = {
		...token,
		sealData: null,
		sealed: false,
		revealId: v4(),
		value,
	};

	const tokens = [revealedToken];

	if (count === 0) {
		yield put(
			startChaosBagReveal({
				...payload,
				tokens,
			}),
		);
		return;
	}
	yield put(addRevealedTokens({ tokens }));

	yield put(openChaosTokenRevealModal());
}

export function* resolveChaosTokenSaga() {
	yield takeEvery(resolveChaosToken.match, worker);
}
