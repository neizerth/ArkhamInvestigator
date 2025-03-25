import { useCallback, useContext } from "react"
import { ModalContext } from "../context"
import type { ModalData } from "@features/modal/model"
import { useAppDispatch } from "../../../../shared/lib/hooks/store/useAppDispatch"
import { closeModal, openModal } from "../store/features/modal/actions"

type UseModalOptions = {
  id: string,
  data: ModalData,
  onOk?: () => void
  onCancel?: () => void
  onClose?: () => void
}
export const useModal = ({
  id,
  data,
  onOk,
  onCancel,
  onClose
}: UseModalOptions) => {
  const dispatch = useAppDispatch();

  const context = useContext(ModalContext);
  
  const ok = useCallback(() => {
    dispatch(closeModal());
    onOk?.();
  }, [dispatch, onOk]);

  const cancel = useCallback(() => {
    dispatch(closeModal());
    onCancel?.();
  }, [dispatch, onCancel]);

  const close = useCallback(() => {
    dispatch(closeModal());
    onClose?.();
  }, [dispatch, onClose]);
  
  const show = useCallback(() => {
    if (context.onCancel) {
      context.onCancel.current = cancel;
    }
    if (context.onOk) {
      context.onOk.current = ok;
    }
    if (context.onClose) {
      context.onClose.current = close;
    }
    
    dispatch(openModal(id, data))
  }, [dispatch, id, data, ok, cancel, close, context]);

  const hide = useCallback(() => {
    dispatch(closeModal())
    if (context.onCancel) {
      context.onCancel.current = null;
    }
    if (context.onOk) {
      context.onOk.current = null;
    }
    if (context.onCancel) {
      context.onCancel.current = null;
    }
  }, [dispatch, context]);

  return [show, hide] as [typeof show, typeof hide];
}