import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import { createAction } from "@reduxjs/toolkit";
import type { InvestigatorBoardNumericStat } from "@shared/model";

export type SetRevealSkillValueFromTypePayload = PropsWithBoardId & {
	type: InvestigatorBoardNumericStat;
};

export const setRevealSkillValueFromType =
	createAction<SetRevealSkillValueFromTypePayload>(
		`${chaosBagRevealPrefix}/setRevealSkillValueFromType`,
	);
