import {
	useAppDispatch,
	useAppSelector,
	useBackButton,
	useBoolean,
} from "@shared/lib";
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

export const useRevealModal = () => {
	const dispatch = useAppDispatch();

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
		if (handleBack) {
			returnTokens();
			return true;
		}
		return false;
	}, [handleBack, returnTokens]);

	useBackButton(onBack);

	const toggleSeal = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(toggleChaosTokenSeal(token.id));
		},
		[dispatch],
	);

	useEffect(() => {
		if (visible && !animate && !isEmpty) {
			reveal();
		}
	}, [animate, visible, reveal, isEmpty]);

	return {
		visible,
		reveal,
		toggleSeal,
		onTokenPress,
		close,
		returnTokens,
		oneMoreLoading,
		setOneMoreLoading,
	};
};
