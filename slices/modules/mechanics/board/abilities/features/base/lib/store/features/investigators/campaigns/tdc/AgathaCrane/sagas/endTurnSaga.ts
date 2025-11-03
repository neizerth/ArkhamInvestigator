import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { selectRevealedHystoryTokensByTurn } from "@modules/chaos-bag/reveal/history/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { startNewTurn, turnEnd } from "@modules/mechanics/phase/features/lib";
import { seconds } from "@shared/lib";
import { delay, put, select, takeEvery } from "redux-saga/effects";

const codes = Object.values(InvesigatorCode.AgathaCrane);

function* worker({ payload }: ReturnType<typeof turnEnd>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);
	const { turnId } = board;

	if (!turnId) {
		console.log("no turn id");
		return;
	}

	if (!codes.includes(board.investigator.code)) {
		console.log("not agatha");
		return;
	}

	const revealedTokensSelector = selectRevealedHystoryTokensByTurn(turnId);
	const revealedTokens: ReturnType<typeof revealedTokensSelector> =
		yield select(revealedTokensSelector);

	if (revealedTokens.length === 0) {
		console.log("no revealed tokens");
		return;
	}

	const getCount = (filter: (token: RevealedChaosBagToken) => boolean) => {
		return revealedTokens.filter(filter).length;
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
	// this is not right, we should use turnEnd instead. but for backward compatibility, we need to keep this.
	yield takeEvery(startNewTurn.match, worker);
}
