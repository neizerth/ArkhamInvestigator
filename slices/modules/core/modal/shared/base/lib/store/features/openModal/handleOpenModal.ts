import type { ModalDraft, ModalType } from "../../../../model";

export type HandleOpenModalPayload<Data = unknown> = {
	id: string;
	data?: Data;
	type?: ModalType;
	textValue?: string;
};

export function handleOpenModal(
	state: ModalDraft,
	payload: HandleOpenModalPayload,
) {
	state.modalId = payload.id;
	state.data = payload.data || null;
	state.type = payload.type || "custom";
	state.textValue = payload.textValue || null;
}
