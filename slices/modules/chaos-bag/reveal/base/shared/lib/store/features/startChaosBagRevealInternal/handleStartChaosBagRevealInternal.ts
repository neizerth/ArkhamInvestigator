import type {
	InvestigatorBoardNumericStat,
	SkillCheckItem,
} from "@shared/model";
import type { ChaosBagRevealHandler } from "../../../../model";

export type HandleStartChaosBagRevealInternalPayload = {
	type?: InvestigatorBoardNumericStat;
	value?: number;
	title?: string;
	expression?: SkillCheckItem[];
};

export const handleStartChaosBagRevealInternal: ChaosBagRevealHandler<
	HandleStartChaosBagRevealInternalPayload
> = (state, payload) => {
	state.revealedTokenIds = [];

	state.skillCheckType = payload.type || null;
	state.skillValue = payload.value || null;
	state.skillCheckTitle = payload.title || null;
	state.skillCheckExpression = payload.expression || [];
};
