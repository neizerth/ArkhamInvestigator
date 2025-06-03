import { useAppDispatch, useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
} from "../../../../../../../../widgets/control/picker";
import { chaosToken } from "../../../../../config";
import {
	selectModifyScenarioChaosTokens,
	selectScenarioChaosTokenValueByType,
	setCurrentTokenId,
	setScenarioChaosTokenValueByType,
} from "../../../../../lib";
import type { ChaosBagToken, ChaosTokenType } from "../../../../../model";
import * as C from "./CenterPanel.components";

export type CenterPanelProps = ViewProps & {
	onPress?: () => void;
	onLongPress?: () => void;
	lastToken: ChaosBagToken;
};

const data = range(-20, 21);

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
		selectScenarioChaosTokenValueByType(lastToken.type),
	);
	const showTokenValue = useAppSelector(selectModifyScenarioChaosTokens);
	const showTokenType = specialTokenTypes.includes(type);

	const enabled =
		showTokenType && showTokenValue && typeof tokenValue === "number";

	const onTouchStart = useCallback(() => {
		dispatch(setCurrentTokenId(lastToken.id));
	}, [dispatch, lastToken]);

	const tap = Gesture.Tap()
		.runOnJS(true)
		.onBegin(onTouchStart)
		.onStart(() => onPress?.());

	const renderItem: PickerListRenderItem = useCallback(
		({ item }) => {
			return <C.TokenValue value={item} type={type} />;
		},
		[type],
	);

	const setValue = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(
				setScenarioChaosTokenValueByType({
					type,
					value,
				}),
			);
		},
		[dispatch, type],
	);

	const getsture = Gesture.Exclusive(tap);

	return (
		<GestureDetector gesture={getsture}>
			<C.Container style={style}>
				<C.LastToken {...lastToken} {...props} />
				{enabled && (
					<C.ControlContainer>
						<C.Control
							data={data}
							renderItem={renderItem}
							value={tokenValue}
							onValueChanged={setValue}
						/>
					</C.ControlContainer>
				)}

				<C.Expression />
			</C.Container>
		</GestureDetector>
	);
};
