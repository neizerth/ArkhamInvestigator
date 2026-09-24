import {
	increaseCurrentActualPropValue,
	selectCurrentActualPropValue,
	selectDoom,
	setCurrentActualPropValue,
	setDoom,
} from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { StatSourceType } from "@shared/model";
import { useCallback } from "react";

/** the same three gestures, wired either to the investigator or to the scenario */
export const useDoomStat = (type: StatSourceType) => {
	const dispatch = useAppDispatch();

	const investigatorValue = useAppSelector(
		selectCurrentActualPropValue("doom"),
	);
	const scenarioValue = useAppSelector(selectDoom);

	const investigator = type === "investigator";
	const value = investigator ? investigatorValue : scenarioValue;

	const onValueChanged = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(
				investigator
					? setCurrentActualPropValue({ prop: "doom", value })
					: setDoom(value),
			);
		},
		[dispatch, investigator],
	);

	const onLongPress = useCallback(() => {
		dispatch(
			investigator
				? setCurrentActualPropValue({ prop: "doom", value: 0 })
				: setDoom(0),
		);
	}, [dispatch, investigator]);

	const onPress = useCallback(() => {
		dispatch(
			investigator
				? increaseCurrentActualPropValue({ prop: "doom" })
				: setDoom(Math.max(0, scenarioValue + 1)),
		);
	}, [dispatch, investigator, scenarioValue]);

	return { value, onValueChanged, onLongPress, onPress };
};
