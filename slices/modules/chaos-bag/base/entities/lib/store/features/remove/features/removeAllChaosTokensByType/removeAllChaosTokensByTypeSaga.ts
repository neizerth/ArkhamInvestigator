import {
	chaosBagUpdated,
	removeAllChaosTokensByTypeInternal,
	selectChaosBagUpdatedAt,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	allChaosTokensByTypeRemoved,
	removeAllChaosTokensByType,
} from "./removeAllChaosTokensByType";

function* worker({ payload }: ReturnType<typeof removeAllChaosTokensByType>) {
	const lastUpdatedAt: ReturnType<typeof selectChaosBagUpdatedAt> =
		yield select(selectChaosBagUpdatedAt);

	yield put(
		removeAllChaosTokensByTypeInternal({
			...payload,
			lastUpdatedAt,
		}),
	);

	yield put(allChaosTokensByTypeRemoved(payload));

	yield put(chaosBagUpdated(payload));
}

export function* removeAllChaosTokensByTypeSaga() {
	yield takeEvery(removeAllChaosTokensByType.match, worker);
}
