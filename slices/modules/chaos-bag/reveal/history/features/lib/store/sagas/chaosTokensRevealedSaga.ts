import { chaosTokensRevealed } from "@modules/chaos-bag/reveal/base/entities/lib";
import { saveCurrentRevealHistoryItem } from "@modules/chaos-bag/reveal/history/entities/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	yield put(saveCurrentRevealHistoryItem(payload));
}

export function* chaosTokensRevealedSaga() {
	yield takeEvery(chaosTokensRevealed.match, worker);
}
