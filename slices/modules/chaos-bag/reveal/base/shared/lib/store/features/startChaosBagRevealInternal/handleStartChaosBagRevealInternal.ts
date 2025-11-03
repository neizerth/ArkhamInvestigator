import type { SkillCheckItem } from "@modules/board/skill-check/shared/model";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import type { ChaosBagRevealHandler } from "../../../../model";

export type HandleStartChaosBagRevealInternalPayload = {
	boardId?: number;
	type?: InvestigatorBoardNumericStat;
	value?: number;
	title?: string;
	expression?: SkillCheckItem[];
	turnId?: string | null;
};

export const handleStartChaosBagRevealInternal: ChaosBagRevealHandler<
	HandleStartChaosBagRevealInternalPayload
> = (state, payload) => {
	state.turnId = payload.turnId ?? null;
	state.revealedTokens = [];
	state.allRevealedTokens = [];
	state.skillCheckBoardId = payload.boardId ?? null;
	state.skillCheckType = payload.type ?? null;
	state.skillValue = payload.value ?? null;
	state.skillCheckTitle = payload.title ?? null;
	state.skillCheckExpression = payload.expression || [];
	state.result = null;
	state.succeedBy = null;
	state.failed = null;
};
