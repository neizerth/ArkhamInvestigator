import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useHapticLongPress, useHapticTap } from "../../../../../../../haptic";
import { chaosToken } from "../../../../../config";
import {
	selectChaosTokenValueByType,
	selectModifyScenarioChaosTokens,
	setCurrentTokenId,
} from "../../../../../lib";
import type { ChaosBagToken, ChaosTokenType } from "../../../../../model";
import * as C from "./CenterPanel.components";

export type CenterPanelProps = ViewProps & {
	onPress?: () => void;
	onLongPress?: () => void;
	lastToken: ChaosBagToken;
};

const specialTokenTypes: ChaosTokenType[] = [
	...chaosToken.types.symbolic.base,
	"elderSign",
];

export const CenterPanel = ({
	lastToken,
	style,
	onPress,
	onLongPress,
	...props
}: CenterPanelProps) => {
	const dispatch = useAppDispatch();
	const { type } = lastToken;
	const tokenValue = useAppSelector(
		selectChaosTokenValueByType(lastToken.type),
	);
	const showTokenValue = useAppSelector(selectModifyScenarioChaosTokens);
	const showTokenType = specialTokenTypes.includes(type);

	const enabled =
		showTokenType && showTokenValue && typeof tokenValue === "number";

	const onTouchStart = useCallback(() => {
		dispatch(setCurrentTokenId(lastToken.id));
	}, [dispatch, lastToken]);

	const tap = useHapticTap({
		onPress,
	});

	tap.onStart(onTouchStart);

	const longPress = useHapticLongPress({
		onLongPress,
	});

	const getsture = Gesture.Exclusive(tap, longPress);

	return (
		<GestureDetector gesture={getsture}>
			<C.Container style={style}>
				<C.LastToken {...lastToken} {...props} />
				{enabled && (
					<C.ControlContainer>
						<C.Control type={type} />
					</C.ControlContainer>
				)}

				<C.Expression />
			</C.Container>
		</GestureDetector>
	);
};
