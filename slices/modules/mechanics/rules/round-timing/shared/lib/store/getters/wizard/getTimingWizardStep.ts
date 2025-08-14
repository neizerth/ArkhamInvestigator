import type { TimingPhase } from "../../../../model";

type Options = {
	index: number;
	phase: TimingPhase;
};

export const getTimingWizardStep = ({ phase, index }: Options) =>
	phase.steps[index];
