import type { ChaosBagRevealHandler } from "../../../../model";

export const handleEndChaosBagReveal: ChaosBagRevealHandler = (state) => {
	state.revealedTokens = [];
	state.skillValue = null;
	state.skillCheckTitle = null;
	state.skillCheckExpression = [];
	state.skillCheckType = null;
	state.skillCheckBoardId = null;
	state.succeedBy = null;
	state.result = null;
};
