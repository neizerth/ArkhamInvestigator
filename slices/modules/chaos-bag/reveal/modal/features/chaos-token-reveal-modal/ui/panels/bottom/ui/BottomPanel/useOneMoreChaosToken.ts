import { selectChaosBagLoadingAnimation } from "@modules/chaos-bag/base/shared/lib";
import { revealRandomChaosTokens } from "@modules/chaos-bag/reveal/base/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useContext } from "react";
import { ChaosTokenRevealModalContext as Context } from "../../../../../lib";

export const useOneMoreChaosToken = () => {
	const dispatch = useAppDispatch();
	const { setOneMoreLoading } = useContext(Context);
	const animate = useAppSelector(selectChaosBagLoadingAnimation);

	return useCallback(() => {
		if (animate) {
			setOneMoreLoading(true);
			return;
		}

		dispatch(
			revealRandomChaosTokens({
				boardId: "current",
				count: 1,
			}),
		);
	}, [dispatch, setOneMoreLoading, animate]);
};
