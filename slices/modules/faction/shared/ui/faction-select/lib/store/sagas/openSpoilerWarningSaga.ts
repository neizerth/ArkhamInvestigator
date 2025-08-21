import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import { enableSpoilerFactionModalActionId } from "../../../config";
import { openSpoilerWarning } from "../actions";

function* worker() {
	yield put(
		openConfirm({
			id: "faction-select-spoiler-warning",
			data: {
				title: "Spoiler Alert",
				text: "modal.spoiler.message",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: enableSpoilerFactionModalActionId,
						title: "Yes",
					}),
				],
			},
		}),
	);
}

export function* openSpoilerWarningSaga() {
	yield takeEvery(openSpoilerWarning.match, worker);
}
