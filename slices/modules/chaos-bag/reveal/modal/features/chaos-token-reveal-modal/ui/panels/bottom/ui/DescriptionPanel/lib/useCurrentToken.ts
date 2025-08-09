import {
	selectRevealedTokens,
	setCurrentRevealedTokenId,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { last } from "ramda";
import { useCallback } from "react";
import { selectCurrentRevealedToken } from "../../../../../../lib";
import { getCurrentTokenEffect } from "./useCurrentTokenEffect";

export const useCurrentToken = () => {
	const dispatch = useAppDispatch();

	const effect = getCurrentTokenEffect();

	const tokens = useAppSelector(selectRevealedTokens);
	const currentToken = useAppSelector(selectCurrentRevealedToken);

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
