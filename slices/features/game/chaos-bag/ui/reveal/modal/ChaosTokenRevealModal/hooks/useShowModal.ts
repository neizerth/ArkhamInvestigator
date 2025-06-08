import { useAppDispatch, useAppSelector } from "@shared/lib";
import { usePathname } from "expo-router";
import { useCallback, useEffect } from "react";
import {
	closeRevealChaosTokenModal,
	selectRevealedTokensCount,
	selectShowRevealChaosTokenModal,
	selectUnrevealedChaosTokensCount,
} from "../../../../../lib";

export const useShowModal = () => {
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const show = useAppSelector(selectShowRevealChaosTokenModal);
	const unrevealedCount = useAppSelector(selectUnrevealedChaosTokensCount);
	const revealedCount = useAppSelector(selectRevealedTokensCount);

	const visible = show && pathname === "/board";

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
