import { chaosTokensRevealed } from "@modules/chaos-bag/reveal/base/entities/lib";
import { put, takeEvery } from "redux-saga/effects";
import { updateCurrentRevealHistoryItem } from "../actions";

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	yield put(updateCurrentRevealHistoryItem(payload));
}

export function* chaosTokensRevealedSaga() {
	yield takeEvery(chaosTokensRevealed.match, worker);
}
