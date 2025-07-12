import { ModalActionId, ModalId } from "@modules/core/modal/entities/config";

import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openBoardModal } from "../../thunks";
import { openClearRevealHistoryWarning } from "./openClearRevealHistoryWarning";

function* worker({
	payload,
}: ReturnType<typeof openClearRevealHistoryWarning>) {
	const { boardId } = payload;

	yield put(
		openBoardModal({
			id: ModalId.clearRevealHistory,
			boardId,
			type: "confirm",
			data: {
				title: "Reset Board?",
				text: "modal.skillCheck.clear.text",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: ModalActionId.resetBoard,
						title: "Clear",
					}),
				],
			},
		}),
	);
}

export function* openClearRevealHistoryWarningSaga() {
	yield takeEvery(openClearRevealHistoryWarning.match, worker);
}
