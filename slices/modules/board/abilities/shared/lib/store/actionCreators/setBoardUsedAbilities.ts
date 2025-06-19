import { changeBoardProp } from "@modules/board/base/shared/lib";
import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import type { InvestigatorBoardUsedAbility } from "../../../model";

export type SetUsedAbilitiesPayload = ChangeBoardEventPayload & {
	data: InvestigatorBoardUsedAbility[];
};

export const setBoardUsedAbilities = (payload: SetUsedAbilitiesPayload) =>
	changeBoardProp({
		...payload,
		prop: "usedAbilities",
		value: payload.data,
	});
