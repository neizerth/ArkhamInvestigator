import { takeDamage, takeHorror } from "@modules/board/base/entities/base/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { selectChaosBagTokenById } from "@modules/chaos-bag/base/shared/lib";
import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { createConfirmModalFilter } from "@modules/core/modal/shared/actions/confirm/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import type { ModalActionProcessedPayload } from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import { unsealToken } from "../../unsealToken";
import { modalId, returnModalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
});

const returnFilterAction = createConfirmModalFilter({
	modalId: returnModalId,
});

type ModalActionData = PropsWithBoardId & {
	type: "health" | "sanity";
	id: string;
	returnToRevealModal?: boolean;
};
type ModalAction = ConfirmModalAction<ModalActionData>;
type Payload = ModalActionProcessedPayload<ModalAction>;
type Action = PayloadAction<Payload>;

function* worker({ payload }: Action) {
	const { modalAction } = payload;
	if (!modalAction.data) {
		return;
	}
	const { boardId, id, type, returnToRevealModal } = modalAction.data;

	const tokenSelector = selectChaosBagTokenById(id);
	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		console.error("Token not found");
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

	if (returnToRevealModal) {
		yield put(openChaosTokenRevealModal());
	}
}

export function* processMoonTokenModalActionSaga() {
	yield takeEvery(filterAction, worker);
	yield takeEvery(returnFilterAction, worker);
}
