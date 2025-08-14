import type { TimingPhaseStepType } from "../../../model";

type Options = {
	text: string;
	type: TimingPhaseStepType;
};

export const getPhaseStepName = ({ text, type }: Options) => {
	if (type === "end") {
		return "Phase end";
	}
	if (type === "player-window") {
		return "Player Window";
	}

	const [stepId] = text.split(" ");
	return stepId;
};
