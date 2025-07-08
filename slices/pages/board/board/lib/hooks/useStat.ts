import {
	selectCurrentActualPropValue,
	selectCurrentBasePropValue,
	selectCurrentInitialPropValue,
	setBoardPart,
	setCurrentActualPropValue,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { useCallback } from "react";

type Options = {
	statType: InvestigatorBoardNumericStat;
	minValue?: number;
};

export const useStat = ({
	statType,
	minValue = Number.NEGATIVE_INFINITY,
}: Options) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentActualPropValue(statType));
	const baseValue = useAppSelector(selectCurrentBasePropValue(statType));
	const initialValue = useAppSelector(selectCurrentInitialPropValue(statType));

	const wounds = Math.max(baseValue - value, 0);

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(
				setCurrentActualPropValue({
					prop: statType,
					value,
				}),
			);
		},
		[dispatch, statType],
	);

	const onWoundsChange = useCallback(
		({ value: wounds = 0 }: PickerChangeEvent) => {
			const value = baseValue - wounds;
			dispatch(
				setCurrentActualPropValue({
					prop: statType,
					value,
				}),
			);
		},
		[dispatch, statType, baseValue],
	);

	const onLongPress = useCallback(() => {
		const diff = baseValue - initialValue;

		if (diff === 0) {
			dispatch(
				setBoardPart({
					boardId: "current",
					data: {
						value: {
							[statType]: value + 1,
						},
						baseValue: {
							[statType]: baseValue + 1,
						},
					},
				}),
			);
			return;
		}

		const nextValue = value - diff;

		dispatch(
			setBoardPart({
				boardId: "current",
				data: {
					value: {
						[statType]: nextValue,
					},
					baseValue: {
						[statType]: initialValue,
					},
				},
			}),
		);
	}, [dispatch, baseValue, initialValue, value, statType]);

	const onPress = useCallback(() => {
		if (value <= minValue) {
			return;
		}
		dispatch(
			setCurrentActualPropValue({
				prop: statType,
				value: value - 1,
			}),
		);
	}, [dispatch, statType, minValue, value]);

	return {
		onPress,
		onLongPress,
		onChange,
		onWoundsChange,
		initialValue,
		baseValue,
		value,
		wounds,
	};
};
