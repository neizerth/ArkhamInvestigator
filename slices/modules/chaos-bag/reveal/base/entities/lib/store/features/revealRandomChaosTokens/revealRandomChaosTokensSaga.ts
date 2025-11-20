import { selectBoardCode } from "@modules/board/base/shared/lib";
import { chaosBagUpdated } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectRandomUnrevealedChaosTokens } from "../../selectors";
import { revealChaosTokens } from "../revealChaosTokens";
import {
	randomChaosTokensRevealed,
	revealRandomChaosTokens,
} from "./revealRandomChaosTokens";

function* worker({ payload }: ReturnType<typeof revealRandomChaosTokens>) {
	const { count, boardId } = payload;

	const revealSelector = selectRandomUnrevealedChaosTokens({
		boardId,
		count,
	});

	const { tokens }: ReturnType<typeof revealSelector> =
		yield select(revealSelector);

	const codeSelector = selectBoardCode(boardId);
	const code: ReturnType<typeof codeSelector> = yield select(codeSelector);

	yield put(
		revealChaosTokens({
			...payload,
			tokens,
		}),
	);

	yield put(
		randomChaosTokensRevealed({
			...payload,
			code,
			tokens,
		}),
	);

	yield put(chaosBagUpdated(payload));
}

export function* revealRandomChaosTokensSaga() {
	yield takeEvery(revealRandomChaosTokens.match, worker);
}
