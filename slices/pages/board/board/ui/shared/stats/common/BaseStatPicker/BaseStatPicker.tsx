import {
	selectCurrentActualPropValue,
	selectCurrentBasePropValue,
	selectCurrentInitialPropValue,
	setBoardPart,
} from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import {
	selectShowAdditionalInformation,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorBoardNumericStat } from "@shared/model";
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
	statType: InvestigatorBoardNumericStat;
};

const baseSizes = [0.7, 0.54];

export const BaseStatPicker = ({
	statType,
	contentContainerStyle,
	limitMaxValue = true,
	data: defaultData,
	...props
}: BaseStatPickerProps) => {
	const value = useAppSelector(selectCurrentActualPropValue(statType));
	const baseValue = useAppSelector(selectCurrentBasePropValue(statType));
	const initialValue = useAppSelector(selectCurrentInitialPropValue(statType));
	const showAdditionalInfo = useAppSelector(selectShowAdditionalInformation);

	const diff = baseValue - initialValue;
	const pickerData = useMemo(() => {
		if (defaultData) {
			return defaultData;
		}
		const maxValue = Math.max(diff + 1, 9);
		return range(-initialValue, maxValue);
	}, [defaultData, initialValue, diff]);

	const dispatch = useAppDispatch();

	const setDiff = useCallback(
		(nextDiff: number) => {
			const nextBaseValue = Math.max(0, initialValue + nextDiff);

			const delta = nextBaseValue - baseValue;

			const nextValue = limitMaxValue
				? Math.min(nextBaseValue, value + delta)
				: value + delta;

			dispatch(
				setBoardPart({
					boardId: "current",
					data: {
						value: {
							[statType]: nextValue,
						},
						baseValue: {
							[statType]: nextBaseValue,
						},
					},
				}),
			);
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

	const pickerStyle = useMemo(() => {
		return [props.style, { opacity: Number(!showAdditionalInfo) }];
	}, [props.style, showAdditionalInfo]);

	return (
		<C.Container style={contentContainerStyle}>
			{showAdditionalInfo && (
				<C.Base>
					<C.BaseValue
						value={baseValue}
						style={props.valueStyle}
						sizes={baseSizes}
					/>
				</C.Base>
			)}
			<C.Picker
				{...props}
				style={pickerStyle}
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
