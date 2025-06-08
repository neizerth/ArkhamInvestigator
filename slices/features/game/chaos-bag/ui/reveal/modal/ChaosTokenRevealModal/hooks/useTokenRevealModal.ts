import { routes } from "@shared/config";
import {
	goToPage,
	useAppDispatch,
	useAppSelector,
	useBackButton,
	useBoolean,
} from "@shared/lib";
import { usePathname } from "expo-router";
import { useCallback, useEffect } from "react";
import {
	returnChaosToken,
	returnChaosTokens,
	revealChaosToken,
	selectChaosBagLoadingAnimation,
	selectRevealedTokensCount,
	toggleChaosTokenSeal,
} from "../../../../../lib";
import type { ChaosBagToken } from "../../../../../model";
import { useShowModal } from "./useShowModal";

export const useTokenRevealModal = () => {
	const dispatch = useAppDispatch();
	const pathname = usePathname();

	const revealedCount = useAppSelector(selectRevealedTokensCount);
	const animate = useAppSelector(selectChaosBagLoadingAnimation);

	const [oneMoreLoading, setOneMoreLoading] = useBoolean();

	const { visible, close, isEmpty } = useShowModal();

	const reveal = useCallback(() => {
		setOneMoreLoading.off();
		dispatch(revealChaosToken(1));
	}, [dispatch, setOneMoreLoading.off]);

	const onTokenPress = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(returnChaosToken(token));
			if (revealedCount > 1) {
				return;
			}
			close();
		},
		[dispatch, close, revealedCount],
	);

	const returnTokens = useCallback(() => {
		dispatch(returnChaosTokens());
		close();
	}, [dispatch, close]);

	const handleBack = revealedCount > 0;

	const onBack = useCallback(() => {
		if (pathname !== "/board") {
			return false;
		}
		if (handleBack) {
			returnTokens();
			return true;
		}
		return false;
	}, [handleBack, returnTokens, pathname]);

	useBackButton(onBack);

	const toggleSeal = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(toggleChaosTokenSeal(token.id));
		},
		[dispatch],
	);

	useEffect(() => {
		if (visible && isEmpty) {
			dispatch(goToPage(routes.chaosBagPreview));
		}
	}, [dispatch, visible, isEmpty]);

	const revealFirstToken =
		visible && !animate && !isEmpty && revealedCount === 0;

	useEffect(() => {
		if (revealFirstToken) {
			reveal();
		}
	}, [revealFirstToken, reveal]);

	return {
		visible,
		reveal,
		toggleSeal,
		onTokenPress,
		close,
		returnTokens,
		oneMoreLoading,
		enableLoading: setOneMoreLoading.on,
		disableLoading: setOneMoreLoading.off,
	};
};
