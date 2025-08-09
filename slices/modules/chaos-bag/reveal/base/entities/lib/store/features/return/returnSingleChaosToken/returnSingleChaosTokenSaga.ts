import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, take, takeLatest } from "redux-saga/effects";
import { createReturnFilterAction } from "../../../util";
import {
	type chaosTokenReturned,
	returnChaosToken,
} from "../returnChaosToken/returnChaosToken";
import {
	returnSingleChaosToken,
	singleChaosTokenReturned,
} from "./returnSingleChaosToken";

function* worker({ payload }: ReturnType<typeof returnSingleChaosToken>) {
	const { id } = payload;
	const count: ReturnType<typeof selectRevealedTokensCount> = yield select(
		selectRevealedTokensCount,
	);

	yield put(returnChaosToken(payload));

	const filterAction = createReturnFilterAction(id);
	const returnedAction: ReturnType<typeof chaosTokenReturned> =
		yield take(filterAction);

	yield put(singleChaosTokenReturned(returnedAction.payload));
}

export function* returnSingleChaosTokenSaga() {
	yield takeLatest(returnSingleChaosToken.match, worker);
}
