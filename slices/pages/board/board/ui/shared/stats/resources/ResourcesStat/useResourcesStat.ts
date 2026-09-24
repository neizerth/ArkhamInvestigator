import {
	decreaseCurrentActualPropValue,
	selectCurrentActualPropValue,
	selectResources,
	setCurrentActualPropValue,
	setResources,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { StatSourceType } from "@shared/model";
import { useCallback } from "react";

/** the same three gestures, wired either to the investigator or to the scenario */
export const useResourcesStat = (type: StatSourceType) => {
	const dispatch = useAppDispatch();

	const investigatorValue = useAppSelector(
		selectCurrentActualPropValue("resources"),
	);
	const scenarioValue = useAppSelector(selectResources);

	const investigator = type === "investigator";
	const value = investigator ? investigatorValue : scenarioValue;

	const onChange = useCallback(
		(next = 0) => {
			dispatch(
				investigator
					? setCurrentActualPropValue({ prop: "resources", value: next })
					: setResources(next),
			);
		},
		[dispatch, investigator],
	);

	const onLongPress = useCallback(() => {
		dispatch(
			investigator
				? setCurrentActualPropValue({ prop: "resources", value: 0 })
				: setResources(0),
		);
	}, [dispatch, investigator]);

	// both stop at zero, the investigator one inside the thunk
	const onPress = useCallback(() => {
		if (investigator) {
			dispatch(decreaseCurrentActualPropValue({ prop: "resources", min: 0 }));
			return;
		}
		if (scenarioValue <= 0) {
			return;
		}
		dispatch(setResources(scenarioValue - 1));
	}, [dispatch, investigator, scenarioValue]);

	return { value, onChange, onPress, onLongPress };
};
