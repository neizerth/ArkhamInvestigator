import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	BaseModalAction,
	BaseModalData,
	ModalDraft,
} from "../../../../model";
import {
	type HandleOpenModalPayload,
	handleOpenModal,
} from "./handleOpenModal";

export type { HandleOpenModalPayload as OpenModalPayload };

export function openModal<
	Action extends BaseModalAction,
	Data extends BaseModalData<Action>,
>(
	state: ModalDraft,
	{ payload }: PayloadAction<HandleOpenModalPayload<Action, Data>>,
) {
	handleOpenModal(state, payload);
}
