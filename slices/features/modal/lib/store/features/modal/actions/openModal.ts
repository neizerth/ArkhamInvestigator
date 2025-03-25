import type { ModalData } from "@features/modal/model";
import type { AppThunk } from "@shared/lib";
import { setModalData, setModalId } from "../modal";

export const openModal = (id: string, data: ModalData): AppThunk => 
  (dispatch) => {
    dispatch(setModalId(id));
    dispatch(setModalData(data));
  }