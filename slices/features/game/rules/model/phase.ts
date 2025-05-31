export type TimingPhase = {
	id: string;
	title: string;
	hint?: string;
	type: TimingPhaseType;
	position: number;
	steps: TimingPhaseStep[];
};

export type TimingPhaseType = "mythos" | "investigation" | "enemy" | "upkeep";

export type TimingPhaseStepType = "step" | "player-window" | "end";

export type TimingPhaseStep = {
	id: string;
	type: TimingPhaseStepType;
	specialType?: TimingPhaseStepSpecialType;
	text: string;
	color?: string;
};

export type TimingPhaseStepSpecialType = "mythos-doom" | "upkeep-resource";
