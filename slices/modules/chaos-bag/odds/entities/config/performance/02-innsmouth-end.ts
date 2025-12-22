import type { ChaosOddsPerformanceTestGroup } from "../../model";
import { coreSetEndTest } from "./01-core-set-end";
import { token } from "./common";

export const innsmouthEndTest: ChaosOddsPerformanceTestGroup = {
	id: "tic",
	tokens: [
		...coreSetEndTest.tokens,
		...token({ type: "bless", count: 10, revealCount: 1, value: 2 }),
		...token({ type: "curse", count: 10, revealCount: 1, value: -2 }),
	],
};
