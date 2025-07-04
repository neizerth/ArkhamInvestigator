import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";
import type {
	InvestigatorBoardNumericStat,
	SkillCheckItem,
} from "@shared/model";

export type HandleOpenSkillCheckChaosBagModalPayload = {
	type: InvestigatorBoardNumericStat;
	value: number;
	title?: string;
	expression?: SkillCheckItem[];
};

export const handleOpenSkillCheckChaosBagModal: ChaosBagHandler<
	HandleOpenSkillCheckChaosBagModalPayload
> = (state, payload) => {
	if (!state.enabled) {
		return;
	}

	state.revealedTokenIds = [];

	state.skillCheckType = payload.type;
	state.skillValue = payload.value;
	state.skillCheckTitle = payload.title || null;
	state.skillCheckExpression = payload.expression || [];

	state.showRevealModal = true;
};
