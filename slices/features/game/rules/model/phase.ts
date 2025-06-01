export type TimingPhase = {
	id: TimingPhaseId;
	title: string;
	hint?: string;
	position: number;
	steps: TimingPhaseStep[];
};

export type TimingPhaseId = "mythos" | "investigation" | "enemy" | "upkeep";

export type TimingPhaseStepType = "step" | "player-window" | "end";

export type TimingPhaseStep = {
	id: string;
	index: number;
	name: string;
	type: TimingPhaseStepType;
	specialType?: TimingPhaseStepSpecialType;
	text: string;
	color?: string;
};

export type TimingPhaseStepSpecialType =
	| "mythos-doom"
	| "upkeep-resource"
	| "reset-actions";
