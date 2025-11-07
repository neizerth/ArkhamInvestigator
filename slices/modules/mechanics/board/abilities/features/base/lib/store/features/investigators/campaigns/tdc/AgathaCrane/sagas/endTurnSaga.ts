import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { selectRevealedHistoryTokensByTurn } from "@modules/chaos-bag/reveal/history/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { turnEnd } from "@modules/mechanics/phase/features/lib";
import { seconds } from "@shared/lib";
import { delay, put, select, takeEvery } from "redux-saga/effects";

const codes = Object.values(InvesigatorCode.AgathaCrane);

function* worker({ payload }: ReturnType<typeof turnEnd>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);
	const { turnId } = board;

	if (!turnId) {
		return;
	}

	if (!codes.includes(board.investigator.code)) {
		return;
	}

	const revealedTokensSelector = selectRevealedHistoryTokensByTurn(turnId);
	const revealedTokens: ReturnType<typeof revealedTokensSelector> =
		yield select(revealedTokensSelector);

	if (revealedTokens.length === 0) {
		return;
	}

	const getCount = (filter: (token: RevealedChaosBagToken) => boolean) => {
		const data = revealedTokens
			.filter(filter)
			.filter((token) => !token.removed);
		return data.length;
	};

	const canceledTokens = getCount((token) => Boolean(token.canceled));
	const sealedTokens = getCount((token) => Boolean(token.sealed));

	if (canceledTokens === 0 && sealedTokens === 0) {
		return;
	}

	yield delay(seconds(4));

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId: AbilityCode.AgathaCrane,
			canUse: false,
		}),
	);
}

export function* AgathaCraneEndTurnAbilitySaga() {
	yield takeEvery(turnEnd.match, worker);
}
