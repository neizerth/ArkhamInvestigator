import {
	decreaseCurrentStat,
	selectCurrentStatValues,
	setCurrentStat,
	setStatTransaction,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorBoardStat } from "@shared/model";
import type { PickerChangeEvent } from "@widgets/picker";
import { useCallback, useMemo } from "react";

export const useStat = (statType: InvestigatorBoardStat) => {
	const dispatch = useAppDispatch();
	const selectValues = useMemo(
		() => selectCurrentStatValues(statType),
		[statType],
	);

	const { initialValue, baseValue, value } = useAppSelector(selectValues);

	const wounds = Math.max(baseValue - value, 0);

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(setCurrentStat(statType, value));
		},
		[dispatch, statType],
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
		console.log("press!");
		dispatch(decreaseCurrentStat(statType));
	}, [dispatch, statType]);

	return {
		onPress,
		onLongPress,
		onChange,
		initialValue,
		baseValue,
		value,
		wounds,
	};
};
