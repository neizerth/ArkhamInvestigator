import {
	chaosBagUpdated,
	removeAllChaosTokensByTypeInternal,
} from "@modules/chaos-bag/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import {
	allChaosTokensByTypeRemoved,
	removeAllChaosTokensByType,
} from "./removeAllChaosTokensByType";

function* worker({ payload }: ReturnType<typeof removeAllChaosTokensByType>) {
	yield put(removeAllChaosTokensByTypeInternal(payload));

	yield put(allChaosTokensByTypeRemoved(payload));

	yield put(chaosBagUpdated(payload));
}

export function* removeAllChaosTokensByTypeSaga() {
	yield takeEvery(removeAllChaosTokensByType.match, worker);
}
