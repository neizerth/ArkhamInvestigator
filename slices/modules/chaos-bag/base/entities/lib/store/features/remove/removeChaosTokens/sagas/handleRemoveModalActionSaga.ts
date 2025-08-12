import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import {
	type ModalActionProcessedPayload,
	createModalActionFilter,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import {
	type RemoveChaosTokensPayload,
	procesChaosTokenRemove,
} from "../../removeChaosTokens";
import { confirmRemoveModalActionId } from "../config";

const filterAction = createModalActionFilter({
	ids: [confirmRemoveModalActionId],
});

type ModalAction = ConfirmModalAction<RemoveChaosTokensPayload>;
type Action = PayloadAction<ModalActionProcessedPayload<ModalAction>>;

function* worker({ payload }: Action) {
	const { data } = payload.modalAction;

	yield put(procesChaosTokenRemove(data));
}

export function* handleRemoveModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
