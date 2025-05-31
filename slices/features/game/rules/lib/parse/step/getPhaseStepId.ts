import type { TimingPhaseStepType } from "../../../model";

type Options = {
	text: string;
	type: TimingPhaseStepType;
	position: number;
};

export const getPhaseStepId = ({ text, type, position }: Options): string => {
	const [id] = text.split(" ");

	if (type === "step") {
		return id;
	}

	if (type === "player-window") {
		return `${type}-${position}`;
	}

	return type;
};
