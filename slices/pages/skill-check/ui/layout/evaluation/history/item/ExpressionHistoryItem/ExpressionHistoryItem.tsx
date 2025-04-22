import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import type { ExpressionDisplayProps } from "../../../ExpressionDisplay";

import {
	selectSkillCheckHistoryItem as selectItem,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import { type SharedValue, useAnimatedStyle } from "react-native-reanimated";
import * as C from "./ExpressionHistoryItem.components";

export type ExpressionHistoryItemProps = ExpressionDisplayProps & {
	itemId: string;
	title?: string;
};

export const ExpressionHistoryItem = ({
	itemId,
	...props
}: ExpressionHistoryItemProps) => {
	const { pinned, title } = useAppSelector(selectItem(itemId));

	const renderRightActions = useCallback(
		(_: SharedValue<number>, drag: SharedValue<number>) => {
			const style = useAnimatedStyle(() => {
				return {
					transform: [{ translateX: drag.value + 165 }],
				};
			});
			return <C.RightActions itemId={itemId} style={style} />;
		},
		[itemId],
	);

	return (
		<C.Container>
			{pinned && <C.Pin />}
			{title && (
				<C.Title>
					<C.TitleText>{title}</C.TitleText>
				</C.Title>
			)}
			<GestureHandlerRootView>
				<ReanimatedSwipeable renderRightActions={renderRightActions}>
					<C.Display {...props} />
				</ReanimatedSwipeable>
			</GestureHandlerRootView>
		</C.Container>
	);
};
