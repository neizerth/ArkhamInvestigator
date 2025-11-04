import { selectBoardById } from "@modules/board/base/shared/lib";
import { unsealChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { selectChaosBagTokenById } from "@modules/chaos-bag/base/shared/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
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
	if (token.sealed) {
		yield put(unsealChaosToken(payload));
	}

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);
	const { turnId } = board;

	const tokens: RevealedChaosBagToken[] = [
		{
			...token,
			sealData: null,
			sealed: false,
			revealId: v4(),
		},
	];

	yield put(
		startChaosBagReveal({
			...payload,
			tokens,
			turnId,
		}),
	);
}

export function* resolveChaosTokenSaga() {
	yield takeEvery(resolveChaosToken.match, worker);
}
