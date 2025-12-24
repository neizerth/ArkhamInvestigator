import type { ChaosOddsPerformanceTestGroup } from "../../../model";
import { strangeMoonsTest } from "../04-strange-moons";
import { token } from "../common";

export const strangeMoons1BlessTest: ChaosOddsPerformanceTestGroup = {
	id: "sm1b",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 1, revealCount: 1, value: 2 }),
	],
};
