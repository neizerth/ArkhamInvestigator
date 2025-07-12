import { confirmModalActionId } from "@modules/core/modal/shared/actions/confirm/config";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import {
	type ModalClosedPayload,
	selectModalTextValue,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import type { PromptModalData } from "../../../../model";
import { promptClosed } from "../closePrompt";
import { promptConfirmed } from "./promptConfirmed";

type Payload = ModalClosedPayload<
	ConfirmModalAction,
	PromptModalData<ConfirmModalAction>
>;
type Action = PayloadAction<Payload>;

const filterAction = (action: unknown): action is Action => {
	if (!promptClosed.match(action)) {
		return false;
	}

	const { payload } = action;

	return payload.modalAction?.id === confirmModalActionId;
};

function* worker({ payload }: Action) {
	const value: ReturnType<typeof selectModalTextValue> =
		yield select(selectModalTextValue);

	if (value === null) {
		return;
	}

	yield put(
		promptConfirmed({
			...payload,
			value,
		}),
	);
}

export function* confirmPromptSaga() {
	yield takeEvery(filterAction, worker);
}
