import { setChaosTokenValue } from "@modules/chaos-bag/value/entities/lib";
import { put, takeEvery } from "redux-saga/effects";
import { setRevealedTokenValue } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof setChaosTokenValue>) {
	yield put(setRevealedTokenValue(payload));
}

export function* updateRevealedTokenValueSaga() {
	yield takeEvery(setChaosTokenValue.match, worker);
}
