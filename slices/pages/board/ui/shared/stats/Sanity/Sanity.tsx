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
import type { PickerChangeEvent } from "@widgets/picker";
import { range } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import * as C from "./Sanity.components";

export type SanityProps = ViewProps;

const MAX_SANITY_VALUE = 20;

export const Sanity = ({ ...props }: SanityProps) => {
	const dispatch = useAppDispatch();
	const board = useAppSelector(selectCurrentBoard);
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);
	const value = board.value.sanity;
	const initialValue = board.initialValue.sanity || 0;
	const baseValue = board.baseValue.sanity || 0;

	const maxValue = baseValue + 10;

	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			dispatch(setCurrentStat("sanity", value));
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(increaseCurrentStat("sanity", maxValue));
		dispatch(increaseBaseStat("sanity"));
	}, [dispatch, maxValue]);

	const onPress = useCallback(() => {
		dispatch(decreaseCurrentStat("sanity"));
	}, [dispatch]);

	const pickerStyle = {
		opacity: showAdditionalInfo ? 0 : 1,
	};

	const wounds = Math.max(baseValue - value, 0);

	return (
		<C.Container {...props}>
			{baseValue !== initialValue && <C.BaseSanity/>}
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
