import { modalConfirmed } from "@modules/core/modal/shared/actions/confirm/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import {
	type ModalActionProcessedPayload,
	selectModalValue,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import type { BoardSelectModalData } from "../../../../model";
import { boardSelectModalConfirmed } from "./boardSelectModalConfirmed";

type Payload = ModalActionProcessedPayload<
	ConfirmModalAction,
	BoardSelectModalData<ConfirmModalAction>
>;
type Action = PayloadAction<Payload>;

const filterAction = (action: unknown) => {
	if (!modalConfirmed.match(action)) {
		return false;
	}

	const { payload } = action;

	return payload.modalType === "board-select";
};

function* worker({ payload }: Action) {
	const selectedValue: ReturnType<typeof selectModalValue> =
		yield select(selectModalValue);

	const [defaultValue] = payload.modalData.boardIds;

	const value = selectedValue ?? defaultValue;

	if (!value || typeof value !== "number") {
		return;
	}

	yield put(
		boardSelectModalConfirmed({
			...payload,
			value,
		}),
	);
}

export function* boardSelectModalConfirmedSaga() {
	yield takeEvery(filterAction, worker);
}
