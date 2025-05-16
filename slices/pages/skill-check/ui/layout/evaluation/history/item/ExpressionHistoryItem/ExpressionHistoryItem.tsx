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
	onPress?: () => void;
	onPressIn?: () => void;
	onPressOut?: () => void;
	onLongPress?: () => void;
};

export const ExpressionHistoryItem = ({
	itemId,
	onPress,
	onPressIn,
	onPressOut,
	onLongPress,
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
				const value = Math.round(Math.max(drag.value + 165, 0));
				return {
					transform: [{ translateX: value }],
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
				<C.Title
					onPress={onPress}
					onPressIn={onPressIn}
					onPressOut={onPressOut}
					onLongPress={onLongPress}
				>
					<C.TitleText ellipsizeMode="tail" numberOfLines={1}>
						{title}
					</C.TitleText>
				</C.Title>
			)}
			<GestureHandlerRootView>
				<ReanimatedSwipeable
					ref={ref}
					renderRightActions={renderRightActions}
					overshootRight={false}
				>
					<C.Item
						onPress={onPress}
						onPressIn={onPressIn}
						onPressOut={onPressOut}
						onLongPress={onLongPress}
					>
						<C.Display {...props} />
					</C.Item>
				</ReanimatedSwipeable>
			</GestureHandlerRootView>
		</C.Container>
	);
};

export const ExpressionHistoryItemMemo = memo(ExpressionHistoryItem);
