import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { SkillCheckItem } from "@modules/board/skill-check/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type SetCustomChaosBagSkillValuePayload = PropsWithBoardId & {
	value: number;
};

export const setCustomChaosBagSkillValue =
	createAction<SetCustomChaosBagSkillValuePayload>(
		`${chaosBagPrefix}/setCustomSkillValue`,
	);

export type CustomChaosBagSkillValueSetPayload =
	SetCustomChaosBagSkillValuePayload & {
		skillCheckExpression: SkillCheckItem[];
	};

export const customChaosBagSkillValueSet =
	createAction<CustomChaosBagSkillValueSetPayload>(
		`${chaosBagPrefix}/customSkillValueSet`,
	);
