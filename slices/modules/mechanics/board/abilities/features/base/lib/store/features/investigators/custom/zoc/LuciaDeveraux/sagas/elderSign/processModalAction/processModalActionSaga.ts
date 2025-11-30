import { healDamage, healHorror } from "@modules/board/base/entities/base/lib";
import type { BoardActualPropChangePayload } from "@modules/board/base/entities/base/model";
import type { BoardId } from "@modules/board/base/shared/model";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { createConfirmModalFilter } from "@modules/core/modal/shared/actions/confirm/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import type { ModalActionProcessedPayload } from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createConfirmModalFilter({
	modalId: CustomModalId.LuciaDeveraux,
});

type ModalActionData = {
	type: "damage" | "horror";
	boardId: BoardId;
};
type ModalAction = ConfirmModalAction<ModalActionData>;
type Payload = ModalActionProcessedPayload<ModalAction>;
type Action = PayloadAction<Payload>;

function* worker({ payload }: Action) {
	const sourceBoardId = payload.boardId;
	const { boardId, type } = payload.modalAction.data;

	const actionPayload: BoardActualPropChangePayload = {
		boardId,
		sourceBoardId,
	};

	const actionCreator = type === "damage" ? healDamage : healHorror;

	yield put(actionCreator(actionPayload));
}

export function* LuciaDeverauxElderSignProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
