import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, take, takeEvery } from "redux-saga/effects";
import { createReturnFilterAction } from "../../../util";
import { returnChaosToken } from "../returnChaosToken/returnChaosToken";
import {
	allChaosTokensReturned,
	returnAllChaosTokens,
} from "./returnAllChaosTokens";

function* worker() {
	const ids: ReturnType<typeof selectRevealedTokenIds> = yield select(
		selectRevealedTokenIds,
	);

	for (const id of ids) {
		yield put(
			returnChaosToken({
				id,
			}),
		);

		const waitCompleted = createReturnFilterAction(id);

		yield take(waitCompleted);
	}

	yield put(allChaosTokensReturned());
}

export function* returnAllChaosTokensSaga() {
	yield takeEvery(returnAllChaosTokens.match, worker);
}
