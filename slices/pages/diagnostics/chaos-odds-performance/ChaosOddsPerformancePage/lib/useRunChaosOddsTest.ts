import { runChaosOddsPerformanceTest } from "@modules/chaos-bag/odds/entities/lib/store/features/runChaosOddsPerformanceTest";
import { useAppDispatch, whereId } from "@shared/lib";
import { useCallback } from "react";
import { tests } from "../config";

export const useRunChaosOddsTest = () => {
	const dispatch = useAppDispatch();

	return useCallback(
		(id: string) => {
			const test = tests.find(whereId(id));
			if (!test) {
				return;
			}
			console.log("running test", id);
			dispatch(runChaosOddsPerformanceTest(test));
		},
		[dispatch],
	);
};
