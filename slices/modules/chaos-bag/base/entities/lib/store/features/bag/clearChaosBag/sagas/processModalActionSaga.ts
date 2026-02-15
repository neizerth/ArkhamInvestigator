import { createConfirmModalFilter } from "@modules/core/modal/shared/actions/confirm/lib";
import { put, select, takeEvery } from "redux-saga/effects";

import {
	chaosBagUpdated,
	clearChaosBagInternal,
	selectChaosBagUpdatedAt,
} from "@modules/chaos-bag/base/shared/lib";
import { modalActionId, modalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
	modalActionId,
});

function* worker() {
	const lastUpdatedAt: ReturnType<typeof selectChaosBagUpdatedAt> =
		yield select(selectChaosBagUpdatedAt);
	yield put(
		clearChaosBagInternal({
			lastUpdatedAt,
		}),
	);
	yield put(chaosBagUpdated({}));
}

export function* processModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
