import { ModalActionId } from "@modules/core/modal/entities/base/config";
import { createCustomModalActionSaga } from "@modules/core/modal/shared/base/lib";
import { resetBoard } from "@modules/mechanics/board/base/entities/lib";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(
		resetBoard({
			boardId: "current",
		}),
	);
}

export const resetBoardModalActionSaga = createCustomModalActionSaga({
	actionId: ModalActionId.resetBoard,
	worker,
});
