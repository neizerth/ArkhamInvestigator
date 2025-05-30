import type { RulesItem } from "@shared/model";
import { v4 } from "uuid";
import type {
	TimingPhase,
	TimingPhaseStep,
	TimingPhaseStepType,
} from "../../model";
import { formatPhaseStepText } from "./formatPhaseStepText";
import { getPhaseStepColor } from "./getPhaseStepColor";
import { getPhaseStepId } from "./getPhaseStepId";

const stepMapping: Record<string, TimingPhaseStepType> = {
	green: "step",
	red: "player-window",
	grey: "end",
};

export const getRoundPhases = (item: RulesItem) => {
	if (!item.table) {
		return [];
	}

	const phases: TimingPhase[] = [];
	let currentPhase: null | TimingPhase = null;

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
				id: v4(),
				title: text,
				position: phases.length + 1,
				steps: [],
			};
			continue;
		}

		const type: TimingPhaseStepType = stepMapping[color] || "step";

		const id = getPhaseStepId({
			type,
			text,
		});

		const step: TimingPhaseStep = {
			id,
			type,
			text: formatPhaseStepText({ text, type }),
			color: getPhaseStepColor(type),
		};

		currentPhase.steps.push(step);
	}

	if (currentPhase) {
		phases.push(currentPhase);
	}
	return phases;
};
