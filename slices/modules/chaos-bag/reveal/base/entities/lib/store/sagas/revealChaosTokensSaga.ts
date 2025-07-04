import { addRevealedTokens } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { chaosTokensRevealed, revealChaosTokens } from "../actions";
import {
	selectCanRevealChaosTokens,
	selectRandomUnrevealedChaosTokens,
} from "../selectors";

function* worker({ payload }: ReturnType<typeof revealChaosTokens>) {
	const { count } = payload;

	const validateSelector = selectCanRevealChaosTokens(count);
	const validation: ReturnType<typeof validateSelector> =
		yield select(validateSelector);

	if (!validation.canReveal) {
		return;
	}

	const revealSelector = selectRandomUnrevealedChaosTokens(count);
	const tokens: ReturnType<typeof revealSelector> =
		yield select(revealSelector);

	yield put(
		addRevealedTokens({
			tokens,
		}),
	);

	yield put(
		chaosTokensRevealed({
			...payload,
			tokens,
		}),
	);
}

export function* revealChaosTokensSaga() {
	yield takeEvery(revealChaosTokens.match, worker);
}
