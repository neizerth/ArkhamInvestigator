import { chaosOddsPerformanceTestGroups } from "@modules/chaos-bag/odds/entities/config";
import type { ChaosOddsPerformanceTest } from "@modules/chaos-bag/odds/entities/model";
import { prop } from "ramda";

export const headers = ["", "1 ⩾ 0", "0 ⩾ 1", "50 ⩾ 1", "All"];

export const testGroups = chaosOddsPerformanceTestGroups.map((group) => {
	const tests: ChaosOddsPerformanceTest[] = [
		{
			...group,
			id: `${group.id}-zero-difficulty`,
			type: "single",
			difficulty: 0,
			skillValue: 1,
		},
		{
			...group,
			id: `${group.id}-regular`,
			type: "single",
			difficulty: 1,
			skillValue: 0,
		},
		{
			...group,
			id: `${group.id}-half-max-skill`,
			type: "single",
			difficulty: 1,
			skillValue: 50,
		},
		{
			...group,
			id: `${group.id}-all`,
			type: "all",
		},
	];

	return {
		group,
		tests,
	};
});

export const tests = testGroups.flatMap(prop("tests"));
