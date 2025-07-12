import type { ModalReducer } from "../../../model";
import { handleCloseModalInternal } from "../handlers";

export const closeModalInternal: ModalReducer = (state) => {
	handleCloseModalInternal(state);
};
