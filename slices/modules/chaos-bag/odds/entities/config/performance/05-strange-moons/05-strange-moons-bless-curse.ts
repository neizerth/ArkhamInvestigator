import type { ChaosOddsPerformanceTestGroup } from "../../../model";
import { strangeMoonsTest } from "../04-strange-moons";
import { token } from "../common";

export const strangeMoonsBlessCurseTest: ChaosOddsPerformanceTestGroup = {
	id: "smbc",
	tokens: [
		...strangeMoonsTest.tokens,
		...token({ type: "bless", count: 10, revealCount: 1, value: 2 }),
		...token({ type: "curse", count: 10, revealCount: 1, value: -2 }),
	],
};
