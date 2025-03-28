import {
	selectCurrentStatValues,
	setStatTransaction,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorBoardStat } from "@shared/model";
import type { PickerChangeEvent } from "@widgets/picker";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
import type { ViewStyle } from "react-native";
import type { StatPickerProps } from "../StatPicker";
import * as C from "./BaseStatPicker.components";

export type DefinedBaseStatPickerProps = Omit<StatPickerProps, "data"> & {
	contentContainerStyle?: ViewStyle;
};

export type BaseStatPickerProps = DefinedBaseStatPickerProps & {
	statType: InvestigatorBoardStat;
};

export const BaseStatPicker = ({
	statType,
	contentContainerStyle,
	...props
}: BaseStatPickerProps) => {
	const selectValues = useMemo(
		() => selectCurrentStatValues(statType),
		[statType],
	);

	const { initialValue, baseValue, value } = useAppSelector(selectValues);

	const pickerData = [...range(-initialValue, 0), ...range(1, 10)];

	const diff = baseValue - initialValue;

	const dispatch = useAppDispatch();

	const setDiff = useCallback(
		(nextDiff: number) => {
			const nextBaseValue = Math.max(0, initialValue + nextDiff);

			const delta = nextBaseValue - baseValue;

			const nextValue = Math.min(nextBaseValue, value + delta);

			dispatch(setStatTransaction(statType, nextValue, nextBaseValue));
		},
		[dispatch, statType, initialValue, baseValue, value],
	);

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			setDiff(value);
		},
		[setDiff],
	);

	const onLongPress = useCallback(() => {
		setDiff(0);
	}, [setDiff]);

	const onPress = useCallback(() => {
		if (diff > 0) {
			setDiff(diff - 1);
		} else {
			setDiff(diff + 1);
		}
	}, [diff, setDiff]);

	return (
		<C.Container style={contentContainerStyle}>
			<C.Picker
				{...props}
				value={diff}
				data={pickerData}
				onValueChanged={onChange}
				onPress={onPress}
				onLongPress={onLongPress}
				animatedInit={false}
				signed
			/>
		</C.Container>
	);
};
