import { updateRevealedToken } from "@modules/chaos-bag/reveal/base/entities/lib";
import { selectRevealedTokenById } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateCurrentRevealedTokenValue } from "./updateCurrentRevealedTokenValue";

function* worker({
	payload,
}: ReturnType<typeof updateCurrentRevealedTokenValue>) {
	const { id } = payload;
	const tokenSelector = selectRevealedTokenById(id);
	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}
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
