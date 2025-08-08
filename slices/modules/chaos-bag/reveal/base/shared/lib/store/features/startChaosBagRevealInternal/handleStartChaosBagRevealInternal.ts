import type {
	InvestigatorBoardNumericStat,
	SkillCheckItem,
} from "@shared/model";
import type { ChaosBagRevealHandler } from "../../../../model";

export type HandleStartChaosBagRevealInternalPayload = {
	boardId?: number;
	type?: InvestigatorBoardNumericStat;
	value?: number;
	title?: string;
	expression?: SkillCheckItem[];
};

export const handleStartChaosBagRevealInternal: ChaosBagRevealHandler<
	HandleStartChaosBagRevealInternalPayload
> = (state, payload) => {
	state.revealedTokens = [];

	state.skillCheckBoardId = payload.boardId || null;
	state.skillCheckType = payload.type || null;
	state.skillValue = payload.value || null;
	state.skillCheckTitle = payload.title || null;
	state.skillCheckExpression = payload.expression || [];
	state.result = null;
	state.succeedBy = null;
};
