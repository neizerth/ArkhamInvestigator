import type { ChaosOddsPerformanceTestGroup } from "../../model";
import { strangeMoonsTest } from "./04-strange-moons";
import { token } from "./common";

export const strangeMoons7BlessTest: ChaosOddsPerformanceTestGroup = {
	id: "sm7b",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 7, revealCount: 1, value: 2 }),
	],
};
