import { useAppDispatch, useAppSelector, useBackButton } from "@shared/lib";
import { type PropsWithChildren, useCallback, useRef } from "react";

import {
	ModalContext,
	type ModalEventHandlerType,
	closeModal,
	selectModalData,
	selectModalId,
} from "../../../shared";
import * as C from "./ModalProvider.components";

export const ModalProvider = ({ children }: PropsWithChildren) => {
	const dispatch = useAppDispatch();
	const modalId = useAppSelector(selectModalId);
	const modalData = useAppSelector(selectModalData);

	const close = useCallback(() => {
		dispatch(closeModal());
	}, [dispatch]);

	const onOk = useRef<ModalEventHandlerType>(null);
	const onCancel = useRef<ModalEventHandlerType>(null);
	const onClose = useRef<ModalEventHandlerType>(close);

	const contextValue = {
		onOk,
		onCancel,
		onClose,
	};

	const onBack = useCallback(() => {
		if (modalId && onClose.current) {
			close();
			onClose.current();
			return true;
		}
		return false;
	}, [close, modalId]);

	useBackButton(onBack);

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
			{modalId && modalData && <C.Modal data={modalData} />}
		</ModalContext.Provider>
	);
};
