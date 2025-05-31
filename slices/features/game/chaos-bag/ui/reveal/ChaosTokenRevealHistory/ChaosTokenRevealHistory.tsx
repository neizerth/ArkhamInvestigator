import { useAppDispatch, useAppSelector } from "@shared/lib";
import { memo, useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
import { useHapticFeedback } from "../../../../../haptic";
import {
	returnChaosToken,
	selectCurrentTokenId,
	setCurrentTokenId,
	toggleChaosTokenSeal,
} from "../../../lib";
import type { ChaosBagToken } from "../../../model";
import * as C from "./ChaosTokenRevealHistory.components";

export type ChaosTokenRevealHistoryProps = ViewProps & {
	tokens: ChaosBagToken[];
};

export const ChaosTokenRevealHistory = ({
	tokens,
	...props
}: ChaosTokenRevealHistoryProps) => {
	const dispatch = useAppDispatch();
	const currentTokenId = useAppSelector(selectCurrentTokenId);
	const onTokenPress = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(returnChaosToken(token));
		},
		[dispatch],
	);

	const toggleSeal = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(toggleChaosTokenSeal(token.id));
		},
		[dispatch],
	);

	const impactHapticFeedback = useHapticFeedback();

	const onSwipeDown = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(setCurrentTokenId(token.id));
			impactHapticFeedback();
		},
		[impactHapticFeedback, dispatch],
	);

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<ChaosBagToken>) => {
			const onSwipe = onSwipeDown(item);

			const swipeDown = Gesture.Fling()
				.direction(Directions.DOWN)
				.runOnJS(true)
				.onStart(onSwipe);

			const selected = currentTokenId === item.id;

			return (
				<GestureDetector gesture={swipeDown}>
					<C.Button onPress={onTokenPress(item)} onLongPress={toggleSeal(item)}>
						<C.Token token={item} position={index + 1} selected={selected} />
					</C.Button>
				</GestureDetector>
			);
		},
		[onTokenPress, toggleSeal, onSwipeDown, currentTokenId],
	);
	return (
		<C.Container {...props}>
			<C.List data={tokens} renderItem={renderItem} horizontal />
		</C.Container>
	);
};

export const ChaosTokenRevealHistoryMemo = memo(ChaosTokenRevealHistory);
