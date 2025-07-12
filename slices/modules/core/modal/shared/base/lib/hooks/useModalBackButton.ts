import { useAppSelector, useBackButton } from "@shared/lib";
import { useCallback } from "react";
import { selectModalId } from "../store";

export const useModalBackButton = () => {
	const modalId = useAppSelector(selectModalId);

	const onBack = useCallback(() => {
		return Boolean(modalId);
	}, [modalId]);

	useBackButton(onBack);
};
