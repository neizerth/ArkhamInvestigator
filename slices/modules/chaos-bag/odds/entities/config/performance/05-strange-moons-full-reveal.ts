import type { ChaosOddsPerformanceTestGroup } from "../../model";
import { strangeMoonsTest } from "./04-strange-moons";
import { token } from "./common";

export const strangeMoonsFullRevealTest: ChaosOddsPerformanceTestGroup = {
	id: "smr",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "frost", count: 8, revealCount: 1, value: -1 }),
		...token({ type: "moon", count: 6, revealCount: 1 }),
	],
};
