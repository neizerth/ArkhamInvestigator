import type { AppThunk } from "@shared/model";
import { setModalData, setModalId } from "../modal";

export const closeModal = (): AppThunk => (dispatch) => {
	dispatch(setModalId(null));
	dispatch(setModalData(null));
};
