import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import { ModalActionId, ModalId } from "@modules/core/modal/entities/config";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { getBoardFaction } from "@modules/mechanics/board/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { openResetBoardWarning } from "./openResetBoardWarning";

function* worker({ payload }: ReturnType<typeof openResetBoardWarning>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);

	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (!isBoardExists(board)) {
		return;
	}

	const faction = getBoardFaction(board);
	const { investigator } = board;

	yield put(
		openConfirm({
			id: ModalId.resetBoard,
			data: {
				faction,
				title: "Reset Board?",
				subtitle: investigator.name,
				text: "board.reset.text",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: ModalActionId.resetBoard,
						title: "Reset",
					}),
				],
			},
		}),
	);
}

export function* openResetBoardWarningSaga() {
	yield takeEvery(openResetBoardWarning.match, worker);
}
