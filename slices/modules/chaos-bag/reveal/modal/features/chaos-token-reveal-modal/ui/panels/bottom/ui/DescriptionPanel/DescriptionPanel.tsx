import { selectCurrentToken } from "@modules/chaos-bag/base/entities/lib";

import { selectBoardId } from "@modules/board/base/shared/lib";
import { useChaosBagTokenEffects } from "@modules/chaos-bag/effect/features/board-token-effects";
import {
	selectRevealedTokens,
	setCurrentRevealedTokenId,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { last } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./DescriptionPanel.components";

export type DescriptionPanelProps = ViewProps;

export const DescriptionPanel = (props: DescriptionPanelProps) => {
	const dispatch = useAppDispatch();
	const boardId = useAppSelector(selectBoardId("current"));
	const currentToken = useAppSelector(selectCurrentToken);
	const tokens = useAppSelector(selectRevealedTokens);
	const tokenValues = useAppSelector(selectChaosBagTokenValues(boardId));

	const effects = useChaosBagTokenEffects({
		boardId: "current",
		tokenValues,
	});

	const effect = currentToken && effects[currentToken.type];
	const lastToken = last(tokens);
	const lastId = lastToken?.id;

	const isLastToken = !currentToken || currentToken.id === lastId;

	const onPress = useCallback(() => {
		if (isLastToken || !lastId) {
			return false;
		}
		dispatch(setCurrentRevealedTokenId(lastId));
	}, [dispatch, isLastToken, lastId]);

	if (!effect) {
		return null;
	}

	return (
		<C.Container {...props} last={isLastToken} onPress={onPress}>
			<C.Effect value={effect} />
		</C.Container>
	);
};
