import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import type { ExpressionDisplayProps } from "../../../ExpressionDisplay";

import {
	selectIsSkillCheckHistoryItemPinned as selectIsPinned,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { SharedValue } from "react-native-reanimated";
import * as C from "./ExpressionHistoryItem.components";

export type ExpressionHistoryItemProps = ExpressionDisplayProps & {
	itemId: string;
	title?: string;
};

export const ExpressionHistoryItem = ({
	itemId,
	...props
}: ExpressionHistoryItemProps) => {
	const pinned = useAppSelector(selectIsPinned(itemId));

	const renderRightActions = useCallback(
		(prog: SharedValue<number>, drag: SharedValue<number>) => {
			return <C.RightActions itemId={itemId} progress={prog} drag={drag} />;
		},
		[itemId],
	);
	return (
		<C.Container>
			<GestureHandlerRootView>
				<ReanimatedSwipeable renderRightActions={renderRightActions}>
					<C.Display {...props} />
				</ReanimatedSwipeable>
			</GestureHandlerRootView>
		</C.Container>
	);
};
