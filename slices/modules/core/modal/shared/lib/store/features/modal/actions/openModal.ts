import type { AppThunk } from "@shared/model";
import type { ModalData } from "../../../../../model";
import { setModalData, setModalId } from "../modal";

export const openModal =
	(id: string, data: ModalData): AppThunk =>
	(dispatch) => {
		dispatch(setModalId(id));
		dispatch(setModalData(data));
	};
