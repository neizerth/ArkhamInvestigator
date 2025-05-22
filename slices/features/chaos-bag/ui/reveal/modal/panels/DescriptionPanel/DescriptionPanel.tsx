import { useAppDispatch, useAppSelector } from "@shared/lib";
import { last } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import {
	selectCurrentToken,
	selectRevealedTokenIds,
	setCurrentTokenId,
	useChaosBagTokenReference,
} from "../../../../../lib";
import * as C from "./DescriptionPanel.components";

export type DescriptionPanelProps = ViewProps;

export const DescriptionPanel = (props: DescriptionPanelProps) => {
	const dispatch = useAppDispatch();
	const currentToken = useAppSelector(selectCurrentToken);
	const tokenIds = useAppSelector(selectRevealedTokenIds);
	const reference = useChaosBagTokenReference();

	const description = currentToken && reference[currentToken.type];
	const lastId = last(tokenIds);

	const isLastToken = !currentToken || currentToken.id === lastId;

	const onPress = useCallback(() => {
		if (isLastToken || !lastId) {
			return false;
		}
		dispatch(setCurrentTokenId(lastId));
	}, [dispatch, isLastToken, lastId]);

	if (!description) {
		return null;
	}

	return (
		<C.Container {...props} last={isLastToken} onPress={onPress}>
			<C.Description value={description} />
		</C.Container>
	);
};
