import type { RulesItem } from "@shared/model";
import type {
	TimingPhase,
	TimingPhaseStep,
	TimingPhaseStepType,
	TimingPhaseType,
} from "../../model";
import { formatPhaseStepText } from "./formatPhaseStepText";
import { getPhaseStepColor } from "./getPhaseStepColor";
import { getPhaseStepId } from "./getPhaseStepId";
import { getPhaseStepSpecialType } from "./getPhaseStepSpecialType";
import { getPhaseText } from "./getPhaseText";

const stepMapping: Record<string, TimingPhaseStepType> = {
	green: "step",
	red: "player-window",
	grey: "end",
};

const typePositionMapping: Record<number, TimingPhaseType> = {
	1: "mythos",
	2: "investigation",
	3: "enemy",
	4: "upkeep",
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
			const position = phases.length + 1;
			const type = typePositionMapping[position];

			currentPhase = {
				id: `phase-${phases.length}`,
				title,
				type,
				hint,
				position,
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

		const specialType = getPhaseStepSpecialType(text);

		const step: TimingPhaseStep = {
			id,
			type,
			specialType,
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
