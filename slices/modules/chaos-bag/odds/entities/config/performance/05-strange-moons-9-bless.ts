import type { ChaosOddsPerformanceTestGroup } from "../../model";
import { strangeMoonsTest } from "./04-strange-moons";
import { token } from "./common";

export const strangeMoons9BlessTest: ChaosOddsPerformanceTestGroup = {
	id: "sm9b",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 9, revealCount: 1, value: 2 }),
	],
};
