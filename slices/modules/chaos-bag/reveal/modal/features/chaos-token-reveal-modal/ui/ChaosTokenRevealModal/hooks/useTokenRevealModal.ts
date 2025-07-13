import {
	useAppDispatch,
	useAppSelector,
	useBackButton,
	useBoolean,
} from "@shared/lib";
import { useCallback, useEffect } from "react";

import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";
import { selectChaosBagLoadingAnimation } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import {
	returnAllChaosTokens,
	returnChaosToken,
	revealChaosTokens,
	selectRevealedTokensCount,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { useShowModal } from "./useShowModal";

export const useTokenRevealModal = () => {
	const dispatch = useAppDispatch();

	const revealedCount = useAppSelector(selectRevealedTokensCount);
	const animate = useAppSelector(selectChaosBagLoadingAnimation);

	const [oneMoreLoading, setOneMoreLoading] = useBoolean();

	const { visible, close, isEmpty, allowedPage } = useShowModal();

	const reveal = useCallback(() => {
		setOneMoreLoading.off();
		dispatch(
			revealChaosTokens({
				boardId: "current",
				count: 1,
			}),
		);
	}, [dispatch, setOneMoreLoading.off]);

	const onTokenPress = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(
				returnChaosToken({
					id: token.id,
				}),
			);
		},
		[dispatch],
	);

	const returnTokens = useCallback(() => {
		dispatch(returnAllChaosTokens());
	}, [dispatch]);

	const handleBack = revealedCount > 0;

	const onBack = useCallback(() => {
		if (!allowedPage) {
			return false;
		}
		if (handleBack) {
			returnTokens();
			return true;
		}
		return false;
	}, [handleBack, returnTokens, allowedPage]);

	useBackButton(onBack);

	const toggleSeal = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(
				toggleChaosTokenSeal({
					id: token.id,
				}),
			);
		},
		[dispatch],
	);

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
