import {
	selectLastRevealedToken,
	updateRevealedToken,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateCurrentRevealedTokenValue } from "./updateCurrentRevealedTokenValue";

function* worker({
	payload,
}: ReturnType<typeof updateCurrentRevealedTokenValue>) {
	const token: ReturnType<typeof selectLastRevealedToken> = yield select(
		selectLastRevealedToken,
	);

	if (!token) {
		return;
	}

	const { id } = token;
	const { value } = payload;

	yield put(
		updateRevealedToken({
			id,
			data: {
				value,
			},
		}),
	);
}

export function* updateCurrentRevealedTokenValueSaga() {
	yield takeEvery(updateCurrentRevealedTokenValue.match, worker);
}
