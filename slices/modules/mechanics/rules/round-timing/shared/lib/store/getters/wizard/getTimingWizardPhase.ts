import { whereId } from "@shared/lib";
import type { TimingPhase, TimingPhaseId } from "../../../../model";

type Options = {
	phaseId: TimingPhaseId;
	phases: TimingPhase[];
};

export const getTimingWizardPhase = ({ phaseId, phases }: Options) =>
	phases.find(whereId(phaseId));
