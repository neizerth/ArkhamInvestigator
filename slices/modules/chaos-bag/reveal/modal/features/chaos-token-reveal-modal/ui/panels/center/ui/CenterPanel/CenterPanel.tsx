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
import { setCurrentRevealedTokenId } from "@modules/chaos-bag/reveal/base/shared/lib";

import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";
import { returnSingleChaosToken } from "@modules/chaos-bag/reveal/base/entities/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { selectCurrentRevealedToken } from "../../../../../lib";
import * as C from "./CenterPanel.components";

export type CenterPanelProps = ViewProps;

export const CenterPanel = ({ style, ...props }: CenterPanelProps) => {
	const dispatch = useAppDispatch();
	const token = useAppSelector(
		selectCurrentRevealedToken,
	) as RevealedChaosBagToken;

	const { type } = token;

	const showTokenValue = useAppSelector(selectModifyChaosTokens);

	const setCurrentToken = useCallback(() => {
		dispatch(setCurrentRevealedTokenId(token.id));
	}, [dispatch, token]);

	const onPress = useCallback(() => {
		dispatch(
			returnSingleChaosToken({
				id: token.id,
			}),
		);
	}, [dispatch, token]);

	const onLongPress = useCallback(() => {
		dispatch(
			toggleChaosTokenSeal({
				id: token.id,
			}),
		);
	}, [dispatch, token]);

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
				<C.CurrentToken {...token} {...props} />
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
