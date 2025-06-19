import type { InvestigatorBoardUsedAbility } from "@modules/board/abilities/shared/model";
import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import type { SkillCheckHistoryItem } from "@modules/board/skill-check/shared/model";
import type { InvestigatorAbilityValues } from "@shared/model";
import { changeBoardProp } from "./changeBoardProp";

type Payload<T> = ChangeBoardEventPayload & {
	value: T;
};

export const setBoardAbilityValues = (
	payload: Payload<InvestigatorAbilityValues>,
) =>
	changeBoardProp({
		...payload,
		prop: "abilityValues",
	});

export const setBoardUsedAbilities = (
	payload: Payload<InvestigatorBoardUsedAbility[]>,
) =>
	changeBoardProp({
		...payload,
		prop: "usedAbilities",
	});

export const setBoardCheckHistory = (
	payload: Payload<SkillCheckHistoryItem[]>,
) =>
	changeBoardProp({
		...payload,
		prop: "checkHistory",
	});
