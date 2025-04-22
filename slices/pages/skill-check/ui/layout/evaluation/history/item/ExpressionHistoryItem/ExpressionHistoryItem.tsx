import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable, {
	type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import type { ExpressionDisplayProps } from "../../../ExpressionDisplay";

import {
	delay,
	selectSkillCheckHistoryItem as selectItem,
	useAppSelector,
} from "@shared/lib";
import { memo, useCallback, useRef } from "react";
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

	const ref = useRef<SwipeableMethods>(null);

	const close = useCallback(async () => {
		await delay(200);
		ref.current?.close();
	}, []);

	const renderRightActions = useCallback(
		(_: SharedValue<number>, drag: SharedValue<number>) => {
			const style = useAnimatedStyle(() => {
				return {
					transform: [{ translateX: drag.value + 165 }],
				};
			});
			return (
				<C.RightActions itemId={itemId} style={style} onNameChange={close} />
			);
		},
		[itemId, close],
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
				<ReanimatedSwipeable ref={ref} renderRightActions={renderRightActions}>
					<C.Display {...props} />
				</ReanimatedSwipeable>
			</GestureHandlerRootView>
		</C.Container>
	);
};

export const ExpressionHistoryItemMemo = memo(ExpressionHistoryItem);
