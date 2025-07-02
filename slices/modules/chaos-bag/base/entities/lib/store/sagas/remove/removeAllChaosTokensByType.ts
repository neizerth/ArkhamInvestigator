import { removeAllChaosTokensByTypeInternal } from "@modules/chaos-bag/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import {
	allChaosTokensRemovedByType,
	removeAllChaosTokensByType,
} from "../../actions";

function* worker({ payload }: ReturnType<typeof removeAllChaosTokensByType>) {
	yield put(removeAllChaosTokensByTypeInternal(payload));

	yield put(allChaosTokensRemovedByType(payload));
}

export function* removeAllChaosTokensByTypeSaga() {
	yield takeEvery(removeAllChaosTokensByType.match, worker);
}
