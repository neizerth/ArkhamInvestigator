import { selectClues, setClues } from "@modules/board/base/shared/lib";
import { selectCurrentActualPropValue } from "@modules/board/base/shared/lib";
import {
	setInvestigatorClues,
	setScenarioClues,
} from "@modules/mechanics/board/base/features/clues/set-clues";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { StatSourceType } from "@shared/model";
import { useCallback } from "react";

/**
 * The same three gestures, wired either to the investigator or to the scenario. Both
 * setters keep the two pools in sync when the lock is on.
 */
export const useCluesStat = (type: StatSourceType) => {
	const dispatch = useAppDispatch();

	const investigatorValue = useAppSelector(
		selectCurrentActualPropValue("clues"),
	);
	const scenarioValue = useAppSelector(selectClues);

	const investigator = type === "investigator";
	const value = investigator ? investigatorValue : scenarioValue;

	const setValue = useCallback(
		(next: number) => {
			dispatch(
				investigator
					? setInvestigatorClues({ boardId: "current", value: next })
					: setScenarioClues({ boardId: "current", value: next }),
			);
		},
		[dispatch, investigator],
	);

	const onChange = useCallback((next = 0) => setValue(next), [setValue]);

	const onPress = useCallback(() => setValue(value + 1), [setValue, value]);

	// the scenario pool is cleared outright, the investigator one through the sync
	const onLongPress = useCallback(() => {
		if (investigator) {
			setValue(0);
			return;
		}
		dispatch(setClues(0));
	}, [dispatch, investigator, setValue]);

	return { value, onChange, onPress, onLongPress };
};
