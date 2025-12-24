import type { ChaosOddsPerformanceTestGroup } from "../../../model";
import { strangeMoonsTest } from "../04-strange-moons";
import { token } from "../common";

export const strangeMoons4BlessTest: ChaosOddsPerformanceTestGroup = {
	id: "sm4b",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 4, revealCount: 1, value: 2 }),
	],
};
