import type { ChaosOddsPerformanceTestGroup } from "../../../model";
import { strangeMoonsTest } from "../04-strange-moons";
import { token } from "../common";

export const strangeMoons8BlessTest: ChaosOddsPerformanceTestGroup = {
	id: "sm8b",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 8, revealCount: 1, value: 2 }),
	],
};
