import type {
	BaseModalAction,
	BaseModalData,
	ModalDraft,
	ModalType,
} from "../../../model";

export type HandleOpenModalPayload<
	Action extends BaseModalAction,
	Data extends BaseModalData<Action>,
> = {
	id: string;
	data: Data;
	type: ModalType;
	textValue?: string;
};

export function handleOpenModal<
	Action extends BaseModalAction,
	Data extends BaseModalData<Action>,
>(state: ModalDraft, payload: HandleOpenModalPayload<Action, Data>) {
	state.modalId = payload.id;
	state.data = payload.data;
	state.type = payload.type;
	state.textValue = payload.textValue || null;
}
