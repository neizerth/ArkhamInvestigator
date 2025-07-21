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

import { selectCurrentBoardId } from "@modules/board/base/shared/lib";
import { selectModifyChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import {
	selectRevealedTokens,
	setCurrentRevealedTokenId,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectChaosTokenValueByType } from "@modules/chaos-bag/value/features/lib";

import { toggleChaosTokenSeal } from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { returnSingleChaosToken } from "@modules/chaos-bag/reveal/base/entities/lib";
import { last } from "ramda";
import * as C from "./CenterPanel.components";

export type CenterPanelProps = ViewProps;

const specialTokenTypes: ChaosTokenType[] = [
	...chaosToken.types.symbolic.base,
	"bless",
	"curse",
	"elderSign",
];

export const CenterPanel = ({ style, ...props }: CenterPanelProps) => {
	const dispatch = useAppDispatch();
	const boardId = useAppSelector(selectCurrentBoardId);
	const tokens = useAppSelector(selectRevealedTokens);

	const lastToken = last(tokens) as ChaosBagToken;
	const { type } = lastToken;

	const tokenValue = useAppSelector(
		selectChaosTokenValueByType({
			type,
			boardId,
		}),
	);

	const showTokenValue = useAppSelector(selectModifyChaosTokens);
	const showTokenType = specialTokenTypes.includes(type);

	const enabled = showTokenType && showTokenValue;

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
		const base = [tap, longPress];
		if (enabled) {
			return base;
		}
		return [...base, swipeDown];
	}, [enabled, tap, longPress, swipeDown]);

	const getsture = Gesture.Exclusive(...gestures);

	return (
		<GestureDetector gesture={getsture}>
			<C.Container style={style}>
				<C.LastToken {...lastToken} {...props} />
				{enabled && (
					<C.ControlContainer>
						<C.Control type={type} onTouchStart={setCurrentToken} />
					</C.ControlContainer>
				)}

				<C.Expression />
			</C.Container>
		</GestureDetector>
	);
};
