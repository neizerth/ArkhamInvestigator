import type { ChaosBagRevealHandler } from "../../../../model";

export const handleEndChaosBagRevealInternal: ChaosBagRevealHandler = (
	state,
) => {
	state.revealedTokens = [];
	state.allRevealedTokens = [];
	state.skillValue = null;
	state.skillCheckTitle = null;
	state.skillCheckExpression = [];
	state.skillCheckType = null;
	state.skillCheckBoardId = null;
	state.succeedBy = null;
	state.result = null;
};
