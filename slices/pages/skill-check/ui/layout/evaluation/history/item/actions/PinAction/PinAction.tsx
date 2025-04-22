import {
	selectIsSkillCheckHistoryItemPinned as selectIsPinned,
	toggleSkillCheckHistoryItemPin as togglePin,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import type { ExpressionHistoryItemActionProps as ActionProps } from "../../ExpressionHistoryItemAction";
import * as C from "./PinAction.components";

export type PinActionProps = Omit<ActionProps, "icon"> & {
	itemId: string;
	onPin?: () => void;
};

export const PinAction = ({
	itemId,
	onPress: onPressProp,
	onPin,
	...props
}: PinActionProps) => {
	const pinned = useAppSelector(selectIsPinned(itemId));
	const dispatch = useAppDispatch();

	const onPress = useCallback(
		(event: GestureResponderEvent) => {
			dispatch(togglePin(itemId));
			onPressProp?.(event);
			onPin?.();
		},
		[dispatch, onPressProp, itemId, onPin],
	);

	return <C.Container {...props} pinned={pinned} onPress={onPress} />;
};
