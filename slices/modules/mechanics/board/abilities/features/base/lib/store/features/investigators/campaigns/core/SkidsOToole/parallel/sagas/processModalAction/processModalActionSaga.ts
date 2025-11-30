import { createConfirmModalFilter } from "@modules/core/modal/shared/actions/confirm/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import type { ModalActionProcessedPayload } from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";
import { startResourcesTest } from "../startResourcesTest";

const filterAction = createConfirmModalFilter({
	modalId,
});
type Data = {
	count: number;
};
type ModalAction = ConfirmModalAction<Data>;
type ModalPayload = ModalActionProcessedPayload<ModalAction>;
type Action = PayloadAction<ModalPayload>;

function* worker({ payload }: Action) {
	const { boardId } = payload;
	const { count } = payload.modalAction.data;

	yield put(
		startResourcesTest({
			boardId,
			count,
		}),
	);
}

export function* ParallelSkidsOTooleProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
