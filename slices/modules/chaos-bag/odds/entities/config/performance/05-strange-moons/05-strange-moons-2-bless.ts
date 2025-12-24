import type { ChaosOddsPerformanceTestGroup } from "../../../model";
import { strangeMoonsTest } from "../04-strange-moons";
import { token } from "../common";

export const strangeMoons2BlessTest: ChaosOddsPerformanceTestGroup = {
	id: "sm2b",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 2, revealCount: 1, value: 2 }),
	],
};
