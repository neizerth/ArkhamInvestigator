import { useAppDispatch, useAppSelector } from "@shared/lib";

import { processSkillCheckPin } from "@modules/board/skill-check/entities/lib/store/features/processSkillCheckPin";
import { selectSkillCheckHistoryItem } from "@modules/board/skill-check/shared/lib";
import { memo, useCallback } from "react";
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
	const dispatch = useAppDispatch();
	const { pinned } = useAppSelector(
		selectSkillCheckHistoryItem({ boardId: "current", id: itemId }),
	);

	const onPress = useCallback(
		(event: GestureResponderEvent) => {
			dispatch(
				processSkillCheckPin({
					boardId: "current",
					itemId,
				}),
			);
			onPressProp?.(event);
		},
		[dispatch, onPressProp, itemId],
	);

	return <C.Container {...props} pinned={pinned} onPress={onPress} />;
};

export const PinActionMemo = memo(PinAction);
