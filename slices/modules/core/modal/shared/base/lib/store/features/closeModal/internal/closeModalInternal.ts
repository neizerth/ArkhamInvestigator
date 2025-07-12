import type { ModalReducer } from "@modules/core/modal/shared/base/model";
import { handleCloseModalInternal } from "./handleCloseModalInternal";

export const closeModalInternal: ModalReducer = (state) => {
	handleCloseModalInternal(state);
};
