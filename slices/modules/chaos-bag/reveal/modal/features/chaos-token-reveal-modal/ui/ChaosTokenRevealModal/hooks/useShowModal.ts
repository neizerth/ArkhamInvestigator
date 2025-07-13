import {
	selectRevealedTokensCount,
	selectUnrevealedChaosTokensCount,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { endChaosBagReveal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectShowRevealModal } from "@modules/chaos-bag/reveal/modal/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { usePathname } from "expo-router";
import { useCallback } from "react";

const validPathnames = ["/board", "/board/skill-check"];

export const useShowModal = () => {
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const show = useAppSelector(selectShowRevealModal);
	const unrevealedCount = useAppSelector(selectUnrevealedChaosTokensCount);
	const revealedCount = useAppSelector(selectRevealedTokensCount);

	const allowedPage = validPathnames.includes(pathname);

	const visible = show && allowedPage;

	const isEmpty = revealedCount === 0 && unrevealedCount === 0;

	const close = useCallback(() => {
		dispatch(endChaosBagReveal());
	}, [dispatch]);

	return {
		allowedPage,
		visible,
		close,
		isEmpty,
	};
};
