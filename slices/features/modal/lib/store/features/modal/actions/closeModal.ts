import type { AppThunk } from "@shared/lib";
import { setModalData, setModalId } from "../modal";

export const closeModal = (): AppThunk => (dispatch) => {
	dispatch(setModalId(null));
	dispatch(setModalData(null));
};
