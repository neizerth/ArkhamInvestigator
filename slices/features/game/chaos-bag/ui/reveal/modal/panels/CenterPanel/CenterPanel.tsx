import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Directions, GestureDetector } from "react-native-gesture-handler";
import { useHapticSwipe } from "../../../../../../../haptic";
import { setCurrentTokenId } from "../../../../../lib";
import type { ChaosBagToken } from "../../../../../model";
import * as C from "./CenterPanel.components";

export type CenterPanelProps = ViewProps & {
	onPress?: () => void;
	onLongPress?: () => void;
	lastToken: ChaosBagToken;
};

export const CenterPanel = ({
	lastToken,
	style,
	...props
}: CenterPanelProps) => {
	const dispatch = useAppDispatch();

	const onSwipeDown = useCallback(() => {
		dispatch(setCurrentTokenId(lastToken.id));
	}, [dispatch, lastToken]);

	const swipeDown = useHapticSwipe({
		direction: Directions.DOWN,
		onSwipe: onSwipeDown,
	});

	return (
		<GestureDetector gesture={swipeDown}>
			<C.Container style={style}>
				<C.TokenButton activeOpacity={1} {...props}>
					<C.LastToken {...lastToken} />
				</C.TokenButton>

				<C.Expression />
			</C.Container>
		</GestureDetector>
	);
};
