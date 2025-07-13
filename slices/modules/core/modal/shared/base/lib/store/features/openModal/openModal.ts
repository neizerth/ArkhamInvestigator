import type { PayloadAction } from "@reduxjs/toolkit";
import type { ModalDraft } from "../../../../model";
import {
	type HandleOpenModalPayload,
	handleOpenModal,
} from "./handleOpenModal";

export type { HandleOpenModalPayload as OpenModalPayload };

export function openModal(
	state: ModalDraft,
	{ payload }: PayloadAction<HandleOpenModalPayload>,
) {
	handleOpenModal(state, payload);
}
