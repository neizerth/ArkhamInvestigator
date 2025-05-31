import type { RulesItem } from "@shared/model";
import type {
	TimingPhase,
	TimingPhaseStep,
	TimingPhaseStepType,
} from "../../model";
import { formatPhaseStepText } from "./formatPhaseStepText";
import { getPhaseStepColor } from "./getPhaseStepColor";
import { getPhaseStepId } from "./getPhaseStepId";
import { getPhaseText } from "./getPhaseText";

const stepMapping: Record<string, TimingPhaseStepType> = {
	green: "step",
	red: "player-window",
	grey: "end",
};

export const getRoundPhases = (item?: RulesItem) => {
	if (!item?.table) {
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
			const { title, hint } = getPhaseText(text);

			currentPhase = {
				id: `phase-${phases.length}`,
				title,
				hint,
				position: phases.length + 1,
				steps: [],
			};
			continue;
		}

		const type: TimingPhaseStepType = stepMapping[color] || "step";

		const id = getPhaseStepId({
			type,
			text,
			position: currentPhase.steps.length,
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
