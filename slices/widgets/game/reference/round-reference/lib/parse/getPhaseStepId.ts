import { v4 } from "uuid";
import type { TimingPhaseStepType } from "../../model";

type Options = {
	text: string;
	type: TimingPhaseStepType;
};
export const getPhaseStepId = ({ text, type }: Options) => {
	const [id] = text.split(" ");

	return type === "step" ? id : v4();
};
