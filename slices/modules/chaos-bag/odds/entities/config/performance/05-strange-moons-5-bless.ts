import type { ChaosOddsPerformanceTestGroup } from "../../model";
import { strangeMoonsTest } from "./04-strange-moons";
import { token } from "./common";

export const strangeMoons5BlessTest: ChaosOddsPerformanceTestGroup = {
	id: "sm5b",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 5, revealCount: 1, value: 2 }),
	],
};
