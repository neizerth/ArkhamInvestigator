import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { returnChaosToken } from "../returnChaosToken/returnChaosToken";
import { returnAllChaosTokens } from "./returnAllChaosTokens";

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
	}
}

export function* returnAllChaosTokensSaga() {
	yield takeEvery(returnAllChaosTokens.match, worker);
}
