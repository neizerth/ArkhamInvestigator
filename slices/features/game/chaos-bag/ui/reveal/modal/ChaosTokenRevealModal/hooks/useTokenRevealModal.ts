import { routes } from "@shared/config";
import {
	goToPage,
	useAppDispatch,
	useAppSelector,
	useBackButton,
	useBoolean,
} from "@shared/lib";
import { useCallback, useEffect } from "react";

import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";
import { selectChaosBagLoadingAnimation } from "@modules/chaos-bag/base/shared/lib";
import {
	returnAllChaosTokens,
	returnChaosToken,
	revealChaosTokens,
	selectRevealedTokensCount,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import type { ChaosBagToken } from "../../../../../model";
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
			if (revealedCount > 1) {
				return;
			}
			close();
		},
		[dispatch, close, revealedCount],
	);

	const returnTokens = useCallback(() => {
		dispatch(returnAllChaosTokens());
		close();
	}, [dispatch, close]);

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
