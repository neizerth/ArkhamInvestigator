import { useCallback, useContext, useMemo } from "react";
import { useAppDispatch } from "../../../../shared/lib/hooks/store/useAppDispatch";
import type { ModalData, ModalOkEvent } from "../../model";
import { ModalContext } from "../context";
import { closeModal, openModal } from "../store/features/modal/actions";

type ModalEventhandler = (() => void) | false;
type OkEventHandler = ((event: ModalOkEvent) => void) | false;

type UseModalOptions = {
	id: string;
	data: ModalData;
	onOk?: OkEventHandler;
	onCancel?: ModalEventhandler;
	onClose?: ModalEventhandler;
};

export const useModal = ({
	id,
	data,
	onOk,
	onCancel,
	onClose,
}: UseModalOptions) => {
	const dispatch = useAppDispatch();

	const context = useContext(ModalContext);

	const tryClose = useCallback(() => {
		if (onClose === false) {
			return;
		}

		dispatch(closeModal());
	}, [dispatch, onClose]);

	const ok = useCallback(
		(event: ModalOkEvent) => {
			if (onOk === false) {
				return;
			}
			tryClose();
			onOk?.(event);
		},
		[onOk, tryClose],
	);

	const cancel = useCallback(() => {
		if (onCancel === false) {
			return;
		}
		tryClose();
		onCancel?.();
	}, [onCancel, tryClose]);

	const close = useCallback(() => {
		if (onClose === false) {
			return;
		}
		tryClose();
		onClose?.();
	}, [onClose, tryClose]);

	const show = useCallback(() => {
		if (context.onCancel) {
			context.onCancel.current = onCancel !== false ? cancel : null;
		}
		if (context.onOk) {
			context.onOk.current = onOk !== false ? ok : null;
		}
		if (context.onClose) {
			context.onClose.current = onClose !== false ? close : null;
		}

		dispatch(openModal(id, data));
	}, [
		dispatch,
		id,
		data,
		ok,
		cancel,
		close,
		context.onCancel,
		context.onClose,
		context.onOk,
		onOk,
		onClose,
		onCancel,
	]);

	const hide = useCallback(() => {
		dispatch(closeModal());
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

	return useMemo(() => {
		return [show, hide] as [typeof show, typeof hide];
	}, [show, hide]);
};
