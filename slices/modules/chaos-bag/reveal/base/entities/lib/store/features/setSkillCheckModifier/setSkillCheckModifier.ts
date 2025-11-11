import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

type SetSkillCheckModifierPayload = PropsWithBoardId & {
	value: number;
};

export const setSkillCheckModifier = createAction<SetSkillCheckModifierPayload>(
	`${chaosBagRevealPrefix}/setSkillCheckModifier`,
);
