import type { ChaosOddsPerformanceTestGroup } from "../../../model";
import { strangeMoonsTest } from "../04-strange-moons";
import { token } from "../common";

export const strangeMoons3BlessTest: ChaosOddsPerformanceTestGroup = {
	id: "sm3b",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 3, revealCount: 1, value: 2 }),
	],
};
