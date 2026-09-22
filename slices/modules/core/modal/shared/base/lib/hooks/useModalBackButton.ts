import { useBackButton } from "@modules/core/device/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import { useCallback } from "react";
import { closeModal, selectModalId } from "../store";

export const useModalBackButton = () => {
	const dispatch = useAppDispatch();
	const modalId = useAppSelector(selectModalId);

	const onBack = useCallback(() => {
		if (modalId) {
			dispatch(
				closeModal({
					id: modalId,
					source: "backButton",
				}),
			);
		}
		return Boolean(modalId);
	}, [dispatch, modalId]);

	useBackButton(onBack);
};
