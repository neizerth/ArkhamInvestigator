import type { RulesItem } from "@shared/model";
import type {
	RoundReferencePhase,
	RoundReferencePhaseStep,
	RoundReferencePhaseType,
} from "../model";

const stepMapping: Record<string, RoundReferencePhaseType> = {
	green: "step",
	red: "player-window",
	gray: "end",
};

export const getRoundPhases = (item: RulesItem) => {
	if (!item.table) {
		return [];
	}

	const phases: RoundReferencePhase[] = [];
	let currentPhase: null | RoundReferencePhase = null;

	for (const tableRow of item.table) {
		const [cell] = tableRow.row;
		if (!cell && currentPhase) {
			phases.push(currentPhase);
			currentPhase = null;
		}
		if (!cell) {
			continue;
		}
		const { color = "", text } = cell;
		if (currentPhase === null) {
			currentPhase = {
				title: text,
				steps: [],
			};
		}

		const type = stepMapping[color] || "step";

		const step: RoundReferencePhaseStep = {
			text: text,
			type,
		};

		currentPhase.steps.push(step);
	}

	return phases;
};
