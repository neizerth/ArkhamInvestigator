import type { ModalDraft, ModalType } from "../../../../model";

export type HandleOpenModalPayload<Data = unknown> = {
	id: string;
	data?: Data;
	type?: ModalType;
	value?: unknown;
	fullWindowOverlay?: boolean;
	closeFromBackButton?: boolean;
};

export function handleOpenModal(
	state: ModalDraft,
	payload: HandleOpenModalPayload,
) {
	state.modalId = payload.id;
	state.data = payload.data || null;
	state.type = payload.type || "custom";
	state.value = payload.value || null;
	state.fullWindowOverlay = payload.fullWindowOverlay ?? true;
	state.closeFromBackButton = payload.closeFromBackButton || true;
}
