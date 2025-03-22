import {
	decreaseBaseStat,
	decreaseCurrentStat,
	increaseBaseStat,
	increaseCurrentStat,
	selectCurrentStatValues,
	selectShowAdditionalInformation,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { setCurrentStat } from "@shared/lib/store/features/board/actions/stats/current/setCurrentStat";
import type { PickerChangeEvent } from "@widgets/picker";
import { range } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./Sanity.components";
export type SanityProps = ViewProps;

const selectValues = selectCurrentStatValues('sanity');

export const Sanity = ({ ...props }: SanityProps) => {
	const dispatch = useAppDispatch();
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);

	const {
		value,
		baseValue,
		initialValue
	} = useAppSelector(selectValues);

	const diffValue = baseValue - initialValue;

	const maxValue = baseValue + 10;

	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			dispatch(setCurrentStat("sanity", value));
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		if (diffValue < 0) {
			dispatch(increaseBaseStat("health"));
		}
		else {
			dispatch(decreaseBaseStat("health"));
		}
	}, [dispatch, diffValue]);

	const onPress = useCallback(() => {
		dispatch(decreaseCurrentStat("sanity"));
	}, [dispatch]);

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const wounds = Math.max(baseValue - value, 0);
	const showBaseDiff = Boolean(diffValue);

	return (
		<C.Container {...props}>
			{showBaseDiff && <C.BaseSanity/>}
			{showAdditionalInfo && <C.Wounds value={`-${wounds}`} />}
			<C.Picker
				value={value}
				data={range(0, maxValue + 1)}
				onValueChanged={onChange}
				onLongPress={onLongPress}
				onPress={onPress}
				style={pickerStyle}
			/>
		</C.Container>
	);
};
