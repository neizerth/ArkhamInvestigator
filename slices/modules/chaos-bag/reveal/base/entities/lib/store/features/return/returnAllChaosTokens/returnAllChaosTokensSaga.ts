import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, take, takeEvery } from "redux-saga/effects";
import { createReturnFilterAction } from "../../../util";
import { returnChaosToken } from "../returnChaosToken/returnChaosToken";
import {
	allChaosTokensReturned,
	returnAllChaosTokens,
} from "./returnAllChaosTokens";

function* worker() {
	const tokens: ReturnType<typeof selectRevealedTokens> =
		yield select(selectRevealedTokens);

	for (const token of tokens) {
		const { id } = token;
		yield put(
			returnChaosToken({
				id,
				type: "return",
			}),
		);

		const waitCompleted = createReturnFilterAction(id);

		yield take(waitCompleted);
	}

	yield put(
		allChaosTokensReturned({
			tokens,
		}),
	);
}

export function* returnAllChaosTokensSaga() {
	yield takeEvery(returnAllChaosTokens.match, worker);
}
