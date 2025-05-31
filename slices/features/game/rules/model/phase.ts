export type TimingPhase = {
	id: string;
	title: string;
	hint?: string;
	position: number;
	steps: TimingPhaseStep[];
};

export type TimingPhaseStepType = "step" | "player-window" | "end";

export type TimingPhaseStep = {
	id: string;
	type: TimingPhaseStepType;
	text: string;
	color?: string;
};

export type TimingPhaseStepId = "mythos-doom" | "upkeep-resource";
