import {
	decreaseBaseStat,
	decreaseCurrentStat,
	increaseBaseStat,
	increaseCurrentStat,
	selectCurrentBoard,
	selectShowAdditionalInformation,
	setBaseStat,
	signedNumber,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { setCurrentStat } from "@shared/lib/store/features/board/actions/stats/current/setCurrentStat";
import type { HealthProps as BaseHealthProps} from "@shared/ui";
import type { PickerChangeEvent } from "@widgets/picker";
import { range } from "ramda";
import { useCallback } from "react";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import * as C from "./Health.components";
import type { ViewStyle } from "react-native";

type HealthProps = BaseHealthProps & {
	style?: ViewStyle
	contentContainerStyle?: BaseHealthProps['style']
}

export const Health = ({
	contentContainerStyle,
	...props
}: HealthProps) => {
	const dispatch = useAppDispatch();
	const board = useAppSelector(selectCurrentBoard);
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);

	const initialValue = board.initialValue.health || 0;
	const baseValue = board.baseValue.health || 0;
	const value = board.value.health;

	const wounds = Math.max(baseValue - value, 0);

	const maxValue = baseValue + 10;

	const diffValue = baseValue - initialValue;

	const onChange = useCallback(({ value }: PickerChangeEvent) => {
		dispatch(setCurrentStat("health", value));
	}, [dispatch]);

	const onLongPress = useCallback(() => {
		dispatch(increaseCurrentStat("health", maxValue));
		dispatch(increaseBaseStat("health"));
	}, [dispatch, maxValue]);

	const onPress = useCallback(() => {
		dispatch(decreaseCurrentStat("health"));
	}, [dispatch]);

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	}

	return (
		<C.Container {...props}>
			{diffValue !== 0 && <C.BaseHealth/>}
			<C.Content style={contentContainerStyle}>
				{showAdditionalInfo && <C.Wounds value={`-${wounds}`} />}
				<C.Picker
					value={value}
					data={range(0, maxValue + 1)}
					onValueChanged={onChange}
					onLongPress={onLongPress}
					onPress={onPress}
					style={pickerStyle}
				/>
			</C.Content>
		</C.Container>
	);
};
