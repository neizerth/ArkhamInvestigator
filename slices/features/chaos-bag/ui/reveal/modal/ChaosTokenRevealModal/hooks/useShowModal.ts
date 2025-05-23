import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useEffect } from "react";
import {
	closeRevealChaosTokenModal,
	selectRevealedTokensCount,
	selectShowRevealChaosTokenModal,
	selectUnrevealedChaosTokensCount,
} from "../../../../../lib";

export const useShowModal = () => {
	const dispatch = useAppDispatch();

	const visible = useAppSelector(selectShowRevealChaosTokenModal);
	const unrevealedCount = useAppSelector(selectUnrevealedChaosTokensCount);
	const revealedCount = useAppSelector(selectRevealedTokensCount);

	const isEmpty = revealedCount === 0 && unrevealedCount === 0;

	const showModal = revealedCount > 0 || unrevealedCount > 0 || visible;

	const hideModal = !showModal || isEmpty;

	const close = useCallback(() => {
		dispatch(closeRevealChaosTokenModal());
	}, [dispatch]);

	useEffect(() => {
		if (visible && hideModal) {
			close();
		}
	}, [hideModal, visible, close]);

	return {
		visible,
		close,
		isEmpty,
	};
};
