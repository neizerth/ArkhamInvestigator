import {
	type ProcessModalActionPayload,
	closeModal,
	createModalActionFilter,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { cancelModalActionId } from "../config/action";
import type { CancelModalAction } from "../model";

type Payload = ProcessModalActionPayload<CancelModalAction>;
type Action = PayloadAction<Payload>;

const filterAction = createModalActionFilter({
	ids: [cancelModalActionId],
});

function* worker({ payload }: Action) {
	const { modalAction } = payload;
	yield put(
		closeModal({
			...payload,
			source: "action",
			modalAction,
		}),
	);
}

export function* cancelModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
