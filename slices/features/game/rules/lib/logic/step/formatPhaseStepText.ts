import type { TimingPhaseStepType } from "../../../model";

type Options = {
	text: string;
	type: TimingPhaseStepType;
};
export const formatPhaseStepText = ({ text, type }: Options) => {
	if (type === "end") {
		return `<keyword>${text}<keyword>`;
	}
	return text;
};
