import type { ChaosOddsPerformanceTestGroup } from "../../../model";
import { strangeMoonsTest } from "../04-strange-moons";
import { token } from "../common";

export const strangeMoons6BlessTest: ChaosOddsPerformanceTestGroup = {
	id: "sm6b",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 6, revealCount: 1, value: 2 }),
	],
};
