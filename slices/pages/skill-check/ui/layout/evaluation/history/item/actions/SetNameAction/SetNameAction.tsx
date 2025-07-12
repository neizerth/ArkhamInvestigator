import { openSkillCheckItemTitlePrompt } from "@modules/board/skill-check/entities/lib/store/features/openSkillCheckItemTitlePrompt";
import { useAppDispatch } from "@shared/lib";
import { memo, useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import type { ExpressionHistoryItemActionProps as ActionProps } from "../../ExpressionHistoryItemAction";
import * as C from "./SetNameAction.components";

export type SetNameActionProps = Omit<ActionProps, "icon"> & {
	itemId: string;
	onChange?: () => void;
};

export const SetNameAction = ({
	itemId,
	onPress: onPressProp,
	onChange,
	...props
}: SetNameActionProps) => {
	const dispatch = useAppDispatch();

	const onPress = useCallback(
		(event: GestureResponderEvent) => {
			dispatch(
				openSkillCheckItemTitlePrompt({
					itemId,
					boardId: "current",
				}),
			);
			onPressProp?.(event);
		},
		[onPressProp, dispatch, itemId],
	);

	return <C.Container {...props} onPress={onPress} />;
};

export const SetNameActionMemo = memo(SetNameAction);
