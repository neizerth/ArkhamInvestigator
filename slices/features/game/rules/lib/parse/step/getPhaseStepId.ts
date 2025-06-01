import type { TimingPhaseId, TimingPhaseStepType } from "../../../model";

type Options = {
	text: string;
	phaseId: TimingPhaseId;
	type: TimingPhaseStepType;
	position: number;
};

export const getPhaseStepId = ({
	text,
	type,
	phaseId,
	position,
}: Options): string => {
	const [id] = text.split(" ");

	if (type === "step") {
		return id;
	}

	if (type === "player-window") {
		return `${phaseId}-${type}-${position}`;
	}

	return type;
};
