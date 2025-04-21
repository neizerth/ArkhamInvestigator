import {
	toggleSkillCheckHistoryItemPin as togglePin,
	useAppDispatch,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { type SharedValue, useAnimatedStyle } from "react-native-reanimated";
import * as C from "./ExpressionHistoryItemRightActions.components";

export type ExpressionHistoryItemRightActionsProps = ViewProps & {
	drag: SharedValue<number>;
	progress: SharedValue<number>;
	itemId: string;
};

export const ExpressionHistoryItemRightActions = ({
	itemId,
	drag,
	style,
	...props
}: ExpressionHistoryItemRightActionsProps) => {
	const dispatch = useAppDispatch();
	const pin = useCallback(() => {
		dispatch(togglePin(itemId));
	}, [dispatch, itemId]);

	const styleAnimation = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: drag.value + 115 }],
		};
	});

	return (
		<C.Container {...props} style={[style, styleAnimation]}>
			<C.Separator />
			<C.Rename icon="tag" />
			<C.Separator />
			<C.Pin icon="pushpin" onPress={pin} itemId={itemId} />
		</C.Container>
	);
};
