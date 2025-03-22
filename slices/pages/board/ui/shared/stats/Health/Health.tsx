import {
	decreaseBaseStat,
	decreaseCurrentStat,
	increaseBaseStat,
	increaseCurrentStat,
	selectCurrentBoard,
	selectCurrentStatValues,
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

const selectValues = selectCurrentStatValues('health');

export const Health = ({
	contentContainerStyle,
	...props
}: HealthProps) => {
	const dispatch = useAppDispatch();
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);

	const {
		initialValue,
		baseValue,
		value
	} = useAppSelector(selectValues);

	const wounds = Math.max(baseValue - value, 0);

	const maxValue = baseValue + 10;

	const diffValue = baseValue - initialValue;

	const onChange = useCallback(({ value }: PickerChangeEvent) => {
		dispatch(setCurrentStat("health", value));
	}, [dispatch]);

	const onLongPress = useCallback(() => {
		if (diffValue >= 0) {
			dispatch(increaseBaseStat("health"));
		}
		else {
			dispatch(decreaseBaseStat("health"));
		}
	}, [dispatch, diffValue]);

	const onPress = useCallback(() => {
		dispatch(decreaseCurrentStat("health"));
	}, [dispatch]);

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	}

	const showBaseDiff = Boolean(diffValue);

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.BaseHealth/>}
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
