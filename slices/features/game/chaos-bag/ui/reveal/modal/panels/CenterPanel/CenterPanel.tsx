import {
	selectCurrentBoardProp,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
import {
	useHapticLongPress,
	useHapticSwipe,
	useHapticTap,
} from "../../../../../../../haptic";
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
	const { code } = useAppSelector(selectCurrentBoardProp("investigator"));
	const { type } = lastToken;

	const tokenValue = useAppSelector(
		selectChaosTokenValueByType({
			type,
			code,
		}),
	);

	const showTokenValue = useAppSelector(selectModifyScenarioChaosTokens);
	const showTokenType = specialTokenTypes.includes(type);

	const enabled =
		showTokenType && showTokenValue && typeof tokenValue === "number";

	const setCurrentToken = useCallback(() => {
		dispatch(setCurrentTokenId(lastToken.id));
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
