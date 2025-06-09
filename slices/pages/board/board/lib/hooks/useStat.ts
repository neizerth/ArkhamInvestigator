import {
	decreaseCurrentStat,
	selectCurrentStatBaseValue,
	selectCurrentStatInitialValue,
	selectCurrentStatValue,
	setCurrentStat,
	setStatTransaction,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorBoardStat } from "@shared/model";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { useCallback } from "react";

type Options = {
	statType: InvestigatorBoardStat;
	minValue?: number;
};

export const useStat = ({
	statType,
	minValue = Number.NEGATIVE_INFINITY,
}: Options) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentStatValue(statType));
	const baseValue = useAppSelector(selectCurrentStatBaseValue(statType));
	const initialValue = useAppSelector(selectCurrentStatInitialValue(statType));

	const wounds = Math.max(baseValue - value, 0);

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(setCurrentStat(statType, value));
		},
		[dispatch, statType],
	);

	const onWoundsChange = useCallback(
		({ value: wounds = 0 }: PickerChangeEvent) => {
			const value = baseValue - wounds;
			dispatch(setCurrentStat(statType, value));
		},
		[dispatch, statType, baseValue],
	);

	const onLongPress = useCallback(() => {
		const diff = baseValue - initialValue;

		if (diff === 0) {
			dispatch(setStatTransaction(statType, value + 1, baseValue + 1));
			return;
		}

		const nextValue = value - diff;

		dispatch(setStatTransaction(statType, nextValue, initialValue));
	}, [dispatch, baseValue, initialValue, value, statType]);

	const onPress = useCallback(() => {
		dispatch(decreaseCurrentStat(statType, minValue));
	}, [dispatch, statType, minValue]);

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
