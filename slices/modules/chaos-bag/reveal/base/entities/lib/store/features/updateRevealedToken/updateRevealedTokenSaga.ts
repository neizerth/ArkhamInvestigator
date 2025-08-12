import {
	selectRevealedTokenById,
	updateRevealedTokenInternal,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	revealedTokenUpdated,
	updateRevealedToken,
} from "./updateRevealedToken";

function* worker({ payload }: ReturnType<typeof updateRevealedToken>) {
	const { id } = payload;
	const tokenSelector = selectRevealedTokenById(id);
	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	yield put(updateRevealedTokenInternal(payload));

	yield put(
		revealedTokenUpdated({
			...payload,
			token,
		}),
	);
}

export function* updateRevealedTokenSaga() {
	yield takeEvery(updateRevealedToken.match, worker);
}
