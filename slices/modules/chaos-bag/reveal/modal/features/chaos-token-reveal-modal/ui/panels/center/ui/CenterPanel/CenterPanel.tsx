import {
	useHapticLongPress,
	useHapticSwipe,
	useHapticTap,
} from "@modules/core/haptic/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";

import { selectModifyChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import {
	selectRevealedTokens,
	setCurrentRevealedTokenId,
} from "@modules/chaos-bag/reveal/base/shared/lib";

import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";
import { returnSingleChaosToken } from "@modules/chaos-bag/reveal/base/entities/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { last } from "ramda";
import * as C from "./CenterPanel.components";

export type CenterPanelProps = ViewProps;

export const CenterPanel = ({ style, ...props }: CenterPanelProps) => {
	const dispatch = useAppDispatch();
	const tokens = useAppSelector(selectRevealedTokens);

	const lastToken = last(tokens) as RevealedChaosBagToken;
	const { type } = lastToken;

	const showTokenValue = useAppSelector(selectModifyChaosTokens);

	const setCurrentToken = useCallback(() => {
		dispatch(setCurrentRevealedTokenId(lastToken.id));
	}, [dispatch, lastToken]);

	const onPress = useCallback(() => {
		dispatch(
			returnSingleChaosToken({
				id: lastToken.id,
			}),
		);
	}, [dispatch, lastToken]);

	const onLongPress = useCallback(() => {
		dispatch(
			toggleChaosTokenSeal({
				id: lastToken.id,
			}),
		);
	}, [dispatch, lastToken]);

	const tap = useHapticTap({
		onPress,
	});

	const longPress = useHapticLongPress({
		onLongPress,
	});

	const swipeDown = useHapticSwipe({
		direction: Directions.DOWN,
		onSwipe: setCurrentToken,
	});

	const gestures = useMemo(() => {
		return [tap, longPress, swipeDown];
	}, [tap, longPress, swipeDown]);

	const getsture = Gesture.Exclusive(...gestures);

	return (
		<GestureDetector gesture={getsture}>
			<C.Container style={style}>
				<C.LastToken {...lastToken} {...props} />
				{showTokenValue && (
					<C.ControlContainer>
						<C.Control type={type} onTouchStart={setCurrentToken} />
					</C.ControlContainer>
				)}

				<C.Expression />
			</C.Container>
		</GestureDetector>
	);
};
