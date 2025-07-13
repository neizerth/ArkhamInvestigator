import { selectCurrentToken } from "@modules/chaos-bag/base/entities/lib";

import {
	selectRevealedTokenIds,
	setCurrentRevealedTokenId,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { last } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { useChaosBagTokenReference } from "../../../../../../../../../features/game/chaos-bag/lib";
import * as C from "./DescriptionPanel.components";

export type DescriptionPanelProps = ViewProps;

export const DescriptionPanel = (props: DescriptionPanelProps) => {
	const dispatch = useAppDispatch();
	const currentToken = useAppSelector(selectCurrentToken);
	const tokenIds = useAppSelector(selectRevealedTokenIds);
	const reference = useChaosBagTokenReference({
		boardId: "current",
	});

	const effect = currentToken && reference[currentToken.type];
	const lastId = last(tokenIds);

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
