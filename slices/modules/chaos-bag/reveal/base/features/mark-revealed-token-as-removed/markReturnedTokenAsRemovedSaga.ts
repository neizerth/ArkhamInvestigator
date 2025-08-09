import { put, select, takeEvery } from "redux-saga/effects";
import { singleChaosTokenReturned } from "../../entities/lib";
import {
	selectRevealedTokensCount,
	updateRevealedToken,
} from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof singleChaosTokenReturned>) {
	const { token } = payload;
	const { id } = token;

	const count: ReturnType<typeof selectRevealedTokensCount> = yield select(
		selectRevealedTokensCount,
	);

	if (count === 0) {
		return;
	}

	yield put(
		updateRevealedToken({
			id,
			data: {
				removed: true,
			},
			updateType: "all",
		}),
	);
}

export function* markReturnedTokenAsRemovedSaga() {
	yield takeEvery(singleChaosTokenReturned.match, worker);
}
