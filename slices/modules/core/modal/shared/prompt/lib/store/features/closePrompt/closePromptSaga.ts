import {
	type ModalClosedPayload,
	closeModalInternal,
	modalClosed,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Keyboard } from "react-native";
import { delay, put, takeEvery } from "redux-saga/effects";

import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import type { PromptModalData } from "../../../../model";
import { promptClosed } from "./promptClosed";

type Payload = ModalClosedPayload<
	BaseModalAction,
	PromptModalData<BaseModalAction>
>;
type Action = PayloadAction<Payload>;

const filterAction = (action: unknown): action is Action => {
	if (!modalClosed.match(action)) {
		return false;
	}

	const { modalType } = action.payload;

	return modalType === "prompt";
};

function* worker({ payload }: Action) {
	Keyboard.dismiss();

	yield delay(100);

	yield put(closeModalInternal());
	yield put(promptClosed(payload));
}

export function* closePromptSaga() {
	yield takeEvery(filterAction, worker);
}
