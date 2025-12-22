import type { ChaosOddsPerformanceTestGroup } from "../../model";
import { innsmouthEndTest } from "./02-innsmouth-end";
import { token } from "./common";

export const edgeFullRevealTest: ChaosOddsPerformanceTestGroup = {
	id: "eoe",
	tokens: [
		...innsmouthEndTest.tokens,
		...token({ type: "frost", count: 8, revealCount: 1, value: -1 }),
	],
};
