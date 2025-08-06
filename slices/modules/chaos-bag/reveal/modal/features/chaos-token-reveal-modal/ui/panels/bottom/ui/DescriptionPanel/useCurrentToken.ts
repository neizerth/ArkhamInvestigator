import { useChaosBagTokenEffects } from "@modules/chaos-bag/effect/features/board-token-effects";
import {
	selectRevealedTokens,
	setCurrentRevealedTokenId,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { last } from "ramda";
import { useCallback } from "react";
import { selectCurrentRevealedToken } from "../../../../../lib";

export const useCurrentToken = () => {
	const dispatch = useAppDispatch();
	const tokenValues = useAppSelector(selectChaosBagTokenValues("current"));

	const effects = useChaosBagTokenEffects({
		boardId: "current",
		tokenValues,
	});

	const tokens = useAppSelector(selectRevealedTokens);
	const currentToken = useAppSelector(selectCurrentRevealedToken);

	const effect = currentToken && effects[currentToken.type];

	const lastToken = last(tokens);

	const isLast = lastToken?.id === currentToken?.id;

	const onPress = useCallback(() => {
		if (isLast || !lastToken) {
			return false;
		}
		dispatch(setCurrentRevealedTokenId(lastToken.id));
	}, [dispatch, isLast, lastToken]);

	return {
		onPress,
		currentToken,
		effect,
		isLast,
		lastToken,
	};
};
