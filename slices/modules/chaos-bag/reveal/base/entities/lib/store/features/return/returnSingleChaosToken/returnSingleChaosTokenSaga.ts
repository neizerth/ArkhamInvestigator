import { put, takeLatest } from "redux-saga/effects";
import { returnChaosToken } from "../returnChaosToken/returnChaosToken";
import { returnSingleChaosToken } from "./returnSingleChaosToken";

function* worker({ payload }: ReturnType<typeof returnSingleChaosToken>) {
	yield put(returnChaosToken(payload));

	// const token = yield take(chaTokRetur)
}

export function* returnSingleChaosTokenSaga() {
	yield takeLatest(returnSingleChaosToken.match, worker);
}
