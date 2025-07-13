import type { ChaosBagRevealHandler } from "../../../../model";

export const handleEndChaosBagReveal: ChaosBagRevealHandler = (state) => {
	state.revealedTokenIds = [];
	state.skillValue = null;
	state.skillCheckTitle = null;
	state.skillCheckExpression = [];
	state.skillCheckType = null;
};
