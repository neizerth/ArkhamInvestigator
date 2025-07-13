import type { ModalDraft, ModalType } from "../../../../model";

export type HandleOpenModalPayload<Data = unknown> = {
	id: string;
	data: Data;
	type: ModalType;
	textValue?: string;
};

export function handleOpenModal(
	state: ModalDraft,
	payload: HandleOpenModalPayload,
) {
	state.modalId = payload.id;
	state.data = payload.data;
	state.type = payload.type;
	state.textValue = payload.textValue || null;
}
