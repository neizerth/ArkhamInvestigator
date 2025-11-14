import { takeDamage, takeHorror } from "@modules/board/base/entities/base/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { selectChaosBagTokenById } from "@modules/chaos-bag/base/shared/lib";
import { createConfirmModalFilter } from "@modules/core/modal/shared/actions/confirm/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import type { ModalActionProcessedPayload } from "@modules/core/modal/shared/base/lib";
import type { BaseModalData } from "@modules/core/modal/shared/base/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import { unsealToken } from "../../unsealToken";
import { modalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
});

type ModalActionData = PropsWithBoardId & {
	type: "health" | "sanity";
	id: string;
};
type ModalData = BaseModalData<ConfirmModalAction, ModalActionData>;
type Payload = ModalActionProcessedPayload<ConfirmModalAction, ModalData>;
type Action = PayloadAction<Payload>;

function* worker({ payload }: Action) {
	const { modalData } = payload;
	if (!modalData.data) {
		return;
	}
	const { boardId, id, type } = modalData.data;

	const tokenSelector = selectChaosBagTokenById(id);
	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	switch (type) {
		case "health":
			yield put(
				takeDamage({
					boardId,
				}),
			);
			break;
		case "sanity":
			yield put(
				takeHorror({
					boardId,
				}),
			);
			break;
	}
	yield put(
		unsealToken({
			boardId,
			token,
		}),
	);
}

export function* processMoonTokenModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
