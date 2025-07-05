import {
	closeRevealChaosBagModal,
	selectShowRevealChaosTokenModal,
} from "@modules/chaos-bag/base/shared/lib";
import {
	selectRevealedTokensCount,
	selectUnrevealedChaosTokensCount,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { usePathname } from "expo-router";
import { useCallback, useEffect } from "react";

const validPathnames = ["/board", "/board/skill-check"];

export const useShowModal = () => {
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const show = useAppSelector(selectShowRevealChaosTokenModal);
	const unrevealedCount = useAppSelector(selectUnrevealedChaosTokensCount);
	const revealedCount = useAppSelector(selectRevealedTokensCount);

	const allowedPage = validPathnames.includes(pathname);

	const visible = show && allowedPage;

	const isEmpty = revealedCount === 0 && unrevealedCount === 0;

	const showModal = revealedCount > 0 || unrevealedCount > 0 || visible;

	const hideModal = !showModal || isEmpty;

	const close = useCallback(() => {
		dispatch(closeRevealChaosBagModal());
	}, [dispatch]);

	useEffect(() => {
		if (visible && hideModal) {
			close();
		}
	}, [hideModal, visible, close]);

	return {
		allowedPage,
		visible,
		close,
		isEmpty,
	};
};
