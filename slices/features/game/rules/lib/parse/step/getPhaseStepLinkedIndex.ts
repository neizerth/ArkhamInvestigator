import { whereId } from "@shared/lib";
import type { TimingPhaseStep } from "../../../model";

const stepMapping: Record<string, string | undefined> = {
	"2.2.1": "investigation-player-window-2",
	"2.2.2": "2.2",
	"3.3": "enemy-player-window-1",
};

type Options = {
	id: string;
	steps: TimingPhaseStep[];
};

export const getPhaseStepLinkedIndex = ({ id, steps }: Options) => {
	const linkedId = stepMapping[id];

	if (!linkedId) {
		return;
	}

	return steps.findIndex(whereId(id));
};
