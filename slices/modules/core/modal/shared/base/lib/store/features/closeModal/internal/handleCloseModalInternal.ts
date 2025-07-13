import type { ModalHandler } from "../../../../../model";

export const handleCloseModalInternal: ModalHandler = (state) => {
	state.modalId = null;
	state.data = null;
	state.value = null;
	state.type = null;
	state.closeFromBackButton = true;
};
