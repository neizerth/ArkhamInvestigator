import type { ModalReducer } from "../../../../model";
import {
	type HandleOpenCustomModalPayload,
	handleOpenCustomModal,
} from "./handleOpenCustomModal";

export const openCustomModal: ModalReducer<HandleOpenCustomModalPayload> = (
	state,
	{ payload },
) => {
	handleOpenCustomModal(state, payload);
};
