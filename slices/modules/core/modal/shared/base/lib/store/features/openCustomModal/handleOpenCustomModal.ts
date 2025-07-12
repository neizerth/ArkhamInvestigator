import type { ModalHandler } from "../../../../model";

export type HandleOpenCustomModalPayload = {
	id: string;
};

export const handleOpenCustomModal: ModalHandler<
	HandleOpenCustomModalPayload
> = (state, payload) => {
	state.modalId = payload.id;
	state.type = "custom";
};
