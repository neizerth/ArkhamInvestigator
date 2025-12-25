import { coreSetEndTest } from "./01-core-set-end";
import { innsmouthEndTest } from "./02-innsmouth-end";
import { edgeFullRevealTest } from "./03-edge-full-reveal";
import { edgeMoonRevealTest } from "./03-edge-moon-reveal";
import { edgeScenarioRevealTest } from "./03-edge-scenario-reveal";
import { strangeMoonsTest } from "./04-strange-moons";
import { strangeMoonsPerformanceTestGroups } from "./05-strange-moons";
import { fullLoadTest } from "./06-full-load";

export const chaosOddsPerformanceTestGroups = [
	coreSetEndTest,
	innsmouthEndTest,
	edgeFullRevealTest,
	edgeScenarioRevealTest,
	edgeMoonRevealTest,
	...strangeMoonsPerformanceTestGroups,
	strangeMoonsTest,
	fullLoadTest,
];
