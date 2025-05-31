import type { TimingPhaseStepSpecialType } from "../../../model";

const idMapping: Record<string, TimingPhaseStepSpecialType> = {
	"1.2": "mythos-doom",
	"4.4": "upkeep-resource",
};

export const getPhaseStepSpecialType = (text: string) => {
	const [id] = text.split(" ");
	if (id in idMapping) {
		return idMapping[id];
	}
};
