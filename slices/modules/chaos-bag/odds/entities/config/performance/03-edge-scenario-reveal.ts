import type { ChaosOddsPerformanceTestGroup } from "../../model";
import { token } from "./common";

export const edgeScenarioRevealTest: ChaosOddsPerformanceTestGroup = {
	id: "eoes",
	tokens: [
		...token({ type: "0", value: 0, count: 1 }),
		...token({ type: "-1", value: -1, count: 2 }),
		...token({ type: "-2", value: -2, count: 2 }),
		...token({ type: "-3", value: -3, count: 2 }),
		...token({ type: "-4", value: -4, count: 2 }),
		...token({ type: "-5", value: -5, count: 1 }),
		...token({ type: "-6", value: -6, count: 1 }),
		...token({ type: "-7", value: -7, count: 1 }),
		...token({ type: "-8", value: -8, count: 1 }),
		...token({ type: "skull", count: 4, revealCount: 1 }),
		...token({ type: "cultist", count: 4, revealCount: 1 }),
		...token({ type: "elderThing", count: 4, revealCount: 1 }),
		...token({ type: "tablet", count: 4, revealCount: 1 }),
		...token({ type: "elderSign", count: 1 }),
		...token({ type: "autoFail", count: 2 }),
		...token({ type: "bless", count: 10, revealCount: 1, value: 2 }),
		...token({ type: "curse", count: 10, revealCount: 1, value: -2 }),
		...token({ type: "frost", count: 8, revealCount: 1, value: -1 }),
	],
};
