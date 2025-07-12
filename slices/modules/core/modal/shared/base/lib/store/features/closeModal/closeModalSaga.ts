import { put, select, takeEvery } from "redux-saga/effects";
import type { BaseModalAction, BaseModalData } from "../../../../model";
import { getActionById } from "../../../logic";
import {
	closeModalInternal,
	selectModalData,
	selectModalId,
	selectModalType,
} from "../../modal";
import { closeModal, modalClosed } from "./closeModal";

function* worker({ payload }: ReturnType<typeof closeModal>) {
	const modalId: ReturnType<typeof selectModalId> = yield select(selectModalId);
	const modalType: ReturnType<typeof selectModalType> =
		yield select(selectModalType);
	const data: BaseModalData<BaseModalAction> = yield select(selectModalData);

	if (!modalId || !data || !modalType) {
		return;
	}

	const actionPayload =
		payload.source === "action"
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
