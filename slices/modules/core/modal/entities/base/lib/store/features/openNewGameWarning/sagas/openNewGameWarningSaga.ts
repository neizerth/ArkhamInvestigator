import {
	ModalActionId,
	ModalId,
} from "@modules/core/modal/entities/base/config";

import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openNewGameWarning } from "../openNewGameWarning";

function* worker() {
	yield put(
		openModal({
			id: ModalId.resetBoard,
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
