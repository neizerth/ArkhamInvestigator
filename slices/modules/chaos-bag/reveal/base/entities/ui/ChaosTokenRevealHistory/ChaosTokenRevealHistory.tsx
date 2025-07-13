import { useHapticFeedback } from "@modules/core/haptic/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { memo, useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";

import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";

import { returnChaosToken } from "@modules/chaos-bag/reveal/base/entities/lib";
import {
	selectCurrentRevealedTokenId,
	setCurrentRevealedTokenId,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import type { ChaosBagToken } from "../../../../../../../features/game/chaos-bag/model";
import * as C from "./ChaosTokenRevealHistory.components";

export type ChaosTokenRevealHistoryProps = ViewProps & {
	tokens: ChaosBagToken[];
};

export const ChaosTokenRevealHistory = ({
	tokens,
	...props
}: ChaosTokenRevealHistoryProps) => {
	const dispatch = useAppDispatch();
	const currentTokenId = useAppSelector(selectCurrentRevealedTokenId);
	const onTokenPress = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(returnChaosToken(token));
		},
		[dispatch],
	);

	const toggleSeal = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(
				toggleChaosTokenSeal({
					id: token.id,
				}),
			);
		},
		[dispatch],
	);

	const impactHapticFeedback = useHapticFeedback();

	const onSwipeDown = useCallback(
		(token: ChaosBagToken) => () => {
			dispatch(setCurrentRevealedTokenId(token.id));
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
			<C.List
				data={tokens}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				horizontal
			/>
		</C.Container>
	);
};

export const ChaosTokenRevealHistoryMemo = memo(ChaosTokenRevealHistory);
