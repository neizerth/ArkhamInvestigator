import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { setFactionFilter as setFaction } from "@modules/signature/signature-selection/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalActionId, modalId } from "../config";
import { setFactionFilter } from "../setFactionFilter";

function* worker({ payload }: ReturnType<typeof setFactionFilter>) {
	if (payload === "spoiler") {
		yield put(
			openConfirm({
				id: modalId,
				data: {
					title: "Spoiler Alert",
					text: "modal.spoiler.message",
					actions: [
						createCancelModalAction(),
						createConfirmModalAction({
							id: modalActionId,
							title: "Yes",
						}),
					],
				},
			}),
		);
		return;
	}
	yield put(setFaction(payload));
}

export function* setFactionFilterSaga() {
	yield takeEvery(setFactionFilter.match, worker);
}
