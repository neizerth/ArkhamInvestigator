import { v4 } from "uuid";
import type { TimingPhaseStepId, TimingPhaseStepType } from "../../model";

type Options = {
	text: string;
	type: TimingPhaseStepType;
};

const idMapping: Record<string, TimingPhaseStepId> = {
	"1.2": "mythos-doom",
	"4.4": "upkeep-resource",
};

export const getPhaseStepId = ({ text, type }: Options): string => {
	const [id] = text.split(" ");

	if (type !== "step") {
		return v4();
	}

	if (id in idMapping) {
		return idMapping[id];
	}

	return idMapping[id] || id;
};
