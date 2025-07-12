import { ModalActionId, ModalId } from "@modules/core/modal/entities/config";

import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openBoardModal } from "../../../thunks";
import { openNewGameWarning } from "../openNewGameWarning";

function* worker({ payload }: ReturnType<typeof openNewGameWarning>) {
	const { boardId } = payload;

	yield put(
		openBoardModal({
			id: ModalId.resetBoard,
			boardId,
			type: "confirm",
			data: {
				title: "newGame.start.title",
				text: "newGame.start.text",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: ModalActionId.startNewGame,
					}),
				],
			},
		}),
	);
}

export function* openNewGameWarningSaga() {
	yield takeEvery(openNewGameWarning.match, worker);
}
