export type RoundReferencePhase = {
	title: string;
	steps: RoundReferencePhaseStep[];
};

export type RoundReferencePhaseType = "step" | "player-window" | "end";

export type RoundReferencePhaseStep = {
	type: RoundReferencePhaseType;
	text: string;
};
