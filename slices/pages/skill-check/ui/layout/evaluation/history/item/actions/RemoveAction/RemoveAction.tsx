import {
	clearSkillCheckHistoryItem as removeItem,
	useAppDispatch,
} from "@shared/lib";
import { memo, useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import type { ExpressionHistoryItemActionProps as ActionProps } from "../../ExpressionHistoryItemAction";
import * as C from "./RemoveAction.components";

export type RemoveActionProps = Omit<ActionProps, "icon"> & {
	itemId: string;
	onRemove?: () => void;
};

export const RemoveAction = ({
	itemId,
	onPress: onPressProp,
	onRemove,
}: RemoveActionProps) => {
	const dispatch = useAppDispatch();
	const onPress = useCallback(
		(event: GestureResponderEvent) => {
			dispatch(removeItem(itemId));
			onRemove?.();
			onPressProp?.(event);
		},
		[dispatch, onPressProp, itemId, onRemove],
	);

	return <C.Container onPress={onPress} />;
};

export const RemoveActionMemo = memo(RemoveAction);
