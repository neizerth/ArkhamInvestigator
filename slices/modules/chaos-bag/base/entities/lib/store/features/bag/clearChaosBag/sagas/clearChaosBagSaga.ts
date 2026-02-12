import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import { clearChaosBag } from "../clearChaosBag";
import { modalActionId, modalId } from "../config";

function* worker() {
	yield put(
		openConfirm({
			id: modalId,
			data: {
				title: "chaosBag.clear.title",
				text: "chaosBag.clear.text",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: modalActionId,
					}),
				],
			},
		}),
	);
}

export function* clearChaosBagSaga() {
	yield takeEvery(clearChaosBag.match, worker);
}
