import {
	clearSkillCheckHistoryItem as removeItem,
	useAppDispatch,
} from "@shared/lib";
import { useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import type { ExpressionHistoryItemActionProps as ActionProps } from "../../ExpressionHistoryItemAction";
import * as C from "./RemoveAction.components";

export type RemoveActionProps = Omit<ActionProps, "icon"> & {
	itemId: string;
};

export const RemoveAction = ({
	itemId,
	onPress: onPressProp,
}: RemoveActionProps) => {
	const dispatch = useAppDispatch();
	const onPress = useCallback(
		(event: GestureResponderEvent) => {
			dispatch(removeItem(itemId));
			onPressProp?.(event);
		},
		[dispatch, onPressProp, itemId],
	);

	return <C.Container onPress={onPress} />;
};
