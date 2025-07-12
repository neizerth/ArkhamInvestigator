import { useAppDispatch, useAppSelector, useBackButton } from "@shared/lib";
import { useCallback } from "react";
import { closeModal, selectModalId } from "../store";

export const useModalBackButton = () => {
	const dispatch = useAppDispatch();
	const modalId = useAppSelector(selectModalId);

	const onBack = useCallback(() => {
		if (modalId) {
			dispatch(
				closeModal({
					source: "event",
				}),
			);
		}
		return Boolean(modalId);
	}, [dispatch, modalId]);

	useBackButton(onBack);
};
