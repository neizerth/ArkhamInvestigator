import {
	selectCurrentStatBaseValue,
	selectCurrentStatInitialValue,
	selectCurrentStatValue,
	setStatTransaction,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorBoardStat } from "@shared/model";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
import type { ViewStyle } from "react-native";
import type { StatPickerProps } from "../StatPicker";
import * as C from "./BaseStatPicker.components";

export type DefinedBaseStatPickerProps = Omit<StatPickerProps, "data"> & {
	contentContainerStyle?: ViewStyle;
	limitMaxValue?: boolean;
	data?: number[];
};

export type BaseStatPickerProps = DefinedBaseStatPickerProps & {
	statType: InvestigatorBoardStat;
};

export const BaseStatPicker = ({
	statType,
	contentContainerStyle,
	limitMaxValue = true,
	data: defaultData,
	...props
}: BaseStatPickerProps) => {
	const value = useAppSelector(selectCurrentStatValue(statType));
	const baseValue = useAppSelector(selectCurrentStatBaseValue(statType));
	const initialValue = useAppSelector(selectCurrentStatInitialValue(statType));

	const pickerData = useMemo(() => {
		if (defaultData) {
			return defaultData;
		}
		return range(-initialValue, 10);
	}, [defaultData, initialValue]);

	const diff = baseValue - initialValue;

	const dispatch = useAppDispatch();

	const setDiff = useCallback(
		(nextDiff: number) => {
			const nextBaseValue = Math.max(0, initialValue + nextDiff);

			const delta = nextBaseValue - baseValue;

			const nextValue = limitMaxValue
				? Math.min(nextBaseValue, value + delta)
				: value + delta;

			dispatch(setStatTransaction(statType, nextValue, nextBaseValue));
		},
		[dispatch, statType, initialValue, baseValue, value, limitMaxValue],
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
		if (diff === 0) {
			return;
		}
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
				animated={false}
				zeroSign="+"
				signed
			/>
		</C.Container>
	);
};
