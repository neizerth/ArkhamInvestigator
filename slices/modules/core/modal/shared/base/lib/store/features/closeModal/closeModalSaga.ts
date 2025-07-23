import { put, select, takeEvery } from "redux-saga/effects";
import type { BaseModalAction, BaseModalData } from "../../../../model";
import { getActionById } from "../../../logic";
import {
	closeModalInternal,
	selectCloseModalFromBackButton,
	selectModalData,
	selectModalId,
	selectModalType,
} from "../../modal";
import { closeModal, modalClosed } from "./closeModal";

function* worker({ payload }: ReturnType<typeof closeModal>) {
	const modalId: ReturnType<typeof selectModalId> = yield select(selectModalId);

	if (payload.id && payload.id !== modalId) {
		return;
	}

	const canClose: ReturnType<typeof selectCloseModalFromBackButton> =
		yield select(selectCloseModalFromBackButton);

	if (!canClose && payload.source === "backButton") {
		return;
	}

	const modalType: ReturnType<typeof selectModalType> =
		yield select(selectModalType);
	const data: BaseModalData<BaseModalAction> | null =
		yield select(selectModalData);

	if (!modalId || !modalType) {
		return;
	}

	const actionPayload =
		payload.source === "action" && data
			? {
					action: getActionById({
						data,
						id: payload.modalAction.id,
					}),
				}
			: {};

	yield put(closeModalInternal());

	yield put(
		modalClosed({
			...payload,
			...actionPayload,
			modalType,
			modalId,
			data,
		}),
	);
}

export function* closeModalSaga() {
	yield takeEvery(closeModal.match, worker);
}
