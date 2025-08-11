import { put, select, takeEvery } from "redux-saga/effects";

import { selectChaosBagTokensByType } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { sortBy } from "ramda";
import { removeSingleChaosToken } from "../removeSingleChaosToken/removeSingleChaosToken";
import {
	chaosTokenRemovedByType,
	removeChaosTokenByType,
} from "./removeChaosTokenByType";

function* worker({ payload }: ReturnType<typeof removeChaosTokenByType>) {
	const { type, boardId } = payload;

	const revealedIds: ReturnType<typeof selectRevealedTokenIds> = yield select(
		selectRevealedTokenIds,
	);
	const tokenSelector = selectChaosBagTokensByType(type);

	const tokens: ReturnType<typeof tokenSelector> = yield select(tokenSelector);
	const [token] = sortBy(({ id }) => revealedIds.includes(id), tokens);

	yield put(
		removeSingleChaosToken({
			boardId,
			token,
		}),
	);

	yield put(chaosTokenRemovedByType(payload));
}

export function* removeChaosTokenByTypeSaga() {
	yield takeEvery(removeChaosTokenByType.match, worker);
}
