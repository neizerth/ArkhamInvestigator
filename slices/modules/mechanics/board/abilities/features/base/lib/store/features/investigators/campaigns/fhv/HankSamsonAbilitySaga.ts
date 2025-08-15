import { boardHistoryItemAdded } from "@modules/board/history/shared/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";

import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { changeSignatureModalActionId } from "@modules/signature/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!boardHistoryItemAdded.match(action)) {
		return false;
	}
	const { code, item } = action.payload;

	if (code !== InvesigatorCode.HankSamson) {
		return false;
	}

	const { value } = item;

	return typeof value?.health === "number" || typeof value?.sanity === "number";
};

function* worker({ payload }: ReturnType<typeof boardHistoryItemAdded>) {
	const { item } = payload;

	const defated = item.value?.health === 0 || item.value?.sanity === 0;

	if (!defated) {
		return;
	}

	yield put(
		openConfirm({
			id: "change-investigator-after-defeat",
			data: {
				title: "Defeated",
				text: "defeat.modal.text",
				faction: "survivor",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: changeSignatureModalActionId,
						title: "Change",
					}),
				],
			},
		}),
	);
}

export function* HankSamsonAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
