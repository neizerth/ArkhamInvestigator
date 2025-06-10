import { delay, useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useContext, useMemo } from "react";
import { Keyboard } from "react-native";
import type { ModalData, ModalOkEvent } from "../../model";
import { ModalContext } from "../context";
import { selectModalId } from "../store";
import { closeModal, openModal } from "../store/features/modal/actions";

type ModalEventhandler = (() => void | boolean) | false;
type OkEventHandler = ((event: ModalOkEvent) => void | boolean) | false;

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
	const activeId = useAppSelector(selectModalId);

	const context = useContext(ModalContext);

	const tryClose = useCallback(async () => {
		if (onClose === false) {
			return;
		}
		await delay(100);
		Keyboard.dismiss();
		dispatch(closeModal());
	}, [dispatch, onClose]);

	const ok = useCallback(
		(event: ModalOkEvent) => {
			if (onOk === false) {
				return;
			}
			const response = onOk?.(event);
			if (response === false) {
				return;
			}
			tryClose();
		},
		[onOk, tryClose],
	);

	const cancel = useCallback(() => {
		if (onCancel === false) {
			return;
		}
		const response = onCancel?.();
		if (response === false) {
			return;
		}
		tryClose();
	}, [onCancel, tryClose]);

	const close = useCallback(() => {
		if (onClose === false) {
			return;
		}
		tryClose();
		onClose?.();
	}, [onClose, tryClose]);

	const show = useCallback(() => {
		if (id === activeId) {
			return;
		}
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
		activeId,
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
		if (id !== activeId) {
			return;
		}
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
	}, [dispatch, context, activeId, id]);

	return useMemo(() => {
		return [show, hide] as [show: typeof show, hide: typeof hide];
	}, [show, hide]);
};
