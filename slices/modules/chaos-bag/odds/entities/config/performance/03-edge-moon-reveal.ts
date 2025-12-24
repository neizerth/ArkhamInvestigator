import type { ChaosOddsPerformanceTestGroup } from "../../model";
import { innsmouthEndTest } from "./02-innsmouth-end";
import { token } from "./common";

export const edgeMoonRevealTest: ChaosOddsPerformanceTestGroup = {
	id: "eoem",
	tokens: [
		...innsmouthEndTest.tokens,
		...token({ type: "moon", count: 6, revealCount: 1 }),
		...token({ type: "frost", count: 8, revealCount: 1, value: -1 }),
	],
};
