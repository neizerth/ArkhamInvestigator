import { closeModal } from "@features/modal/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { type PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { ModalContext, type ModalEventHandlerType } from "../../lib/context";
import {
	selectModalData,
	selectModalId,
} from "../../lib/store/features/modal/modal";
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

	useEffect(() => {
		const onBack = () => {
			if (modalId && onClose.current) {
				close();
				onClose.current();
				return true;
			}
			return false;
		};
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			onBack,
		);
		return () => backHandler.remove();
	}, [modalId, close]);

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
			{modalId && modalData && <C.Modal data={modalData} />}
		</ModalContext.Provider>
	);
};
