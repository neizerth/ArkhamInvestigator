import {
	selectBoardById,
	setBoardActualPropValue,
	useMainStatPicker,
} from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { makeAction } from "@modules/mechanics/phase/features/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type {
	InvestigatorBoardNumericStat,
	InvestigatorMainStatType,
} from "@shared/model";
import { useCallback } from "react";
import { useValueControl } from "./useValueControl";

const MAX_CLUES = 100;

/**
 * Wires every stat of an overview row to the board: each stat gets a ready set of picker
 * props, so the component itself is only layout.
 */
export const useOverviewStats = (boardId: number) => {
	const dispatch = useAppDispatch();
	const control = useValueControl(boardId);
	const { value, baseValue, initialValue } = useAppSelector(
		selectBoardById(boardId),
	);

	const health = useMainStatPicker({
		value: value.health,
		baseValue: baseValue.health,
	});

	const sanity = useMainStatPicker({
		value: value.sanity,
		baseValue: baseValue.sanity,
	});

	const setMainStat = useCallback(
		(stat: InvestigatorMainStatType, toValue: (picked?: number) => number) =>
			({ value }: PickerChangeEvent) => {
				dispatch(
					setBoardActualPropValue({
						boardId,
						prop: stat,
						value: toValue(value),
					}),
				);
			},
		[dispatch, boardId],
	);

	const onActionsPress = useCallback(() => {
		dispatch(makeAction({ boardId }));
	}, [dispatch, boardId]);

	// every row of the overview shows the same stats, so the ids carry the board
	const withPicker = (stat: InvestigatorBoardNumericStat) => ({
		type: "picker" as const,
		testID: `overview-${boardId}-${stat}`,
		value: value[stat],
		onValueChanged: control.onChange(stat),
	});

	const withMainStat = (
		stat: InvestigatorMainStatType,
		picker: typeof health,
	) => ({
		...withPicker(stat),
		initialValue: initialValue[stat],
		value: picker.value,
		data: picker.data,
		onPress: control.decrease(stat, picker.min),
		onValueChanged: setMainStat(stat, picker.toValue),
	});

	return {
		health: withMainStat("health", health),
		sanity: withMainStat("sanity", sanity),
		clues: {
			...withPicker("clues"),
			onPress: control.increase("clues", MAX_CLUES),
			onLongPress: control.clear("clues"),
		},
		resources: {
			...withPicker("resources"),
			onPress: control.decrease("resources"),
			onLongPress: control.clear("resources"),
		},
		actions: {
			...withPicker("actions"),
			onPress: onActionsPress,
		},
		skills: value,
	};
};
