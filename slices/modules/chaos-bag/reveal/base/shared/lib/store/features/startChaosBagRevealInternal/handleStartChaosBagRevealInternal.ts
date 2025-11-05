import type { SkillCheckItem } from "@modules/board/skill-check/shared/model";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { last } from "ramda";
import type {
	ChaosBagRevealHandler,
	RevealedChaosBagToken,
} from "../../../../model";

export type HandleStartChaosBagRevealInternalPayload = {
	boardId?: number;
	type?: InvestigatorBoardNumericStat;
	value?: number;
	title?: string;
	expression?: SkillCheckItem[];
	turnId?: string | null;
	tokens?: RevealedChaosBagToken[];
	data?: unknown;
};

export const handleStartChaosBagRevealInternal: ChaosBagRevealHandler<
	HandleStartChaosBagRevealInternalPayload
> = (state, payload) => {
	const { tokens = [] } = payload;
	const lastToken = last(tokens);
	const lastTokenId = lastToken?.id;

	state.turnId = payload.turnId ?? null;
	state.revealedTokens = tokens;
	state.allRevealedTokens = tokens;
	state.currentRevealedTokenId = lastTokenId ?? null;
	state.skillCheckBoardId = payload.boardId ?? null;
	state.skillCheckType = payload.type ?? null;
	state.skillValue = payload.value ?? null;
	state.skillCheckTitle = payload.title ?? null;
	state.skillCheckExpression = payload.expression ?? [];
	state.result = null;
	state.succeedBy = null;
	state.failed = null;
	state.skillCheckData = payload.data ?? null;
};
