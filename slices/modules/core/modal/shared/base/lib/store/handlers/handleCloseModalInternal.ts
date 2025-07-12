import type { ModalHandler } from "../../../model";

export const handleCloseModalInternal: ModalHandler = (state) => {
	state.modalId = null;
	state.data = null;
	state.textValue = null;
	state.type = null;
};
