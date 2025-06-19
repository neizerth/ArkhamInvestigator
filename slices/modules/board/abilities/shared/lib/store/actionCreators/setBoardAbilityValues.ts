import { changeBoardProp } from "@modules/board/base/shared/lib";
import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import type { InvestigatorAbilityValues } from "../../../model";

export type SetBoardAbilityValuesPayload = ChangeBoardEventPayload & {
	data: InvestigatorAbilityValues;
};

export const setBoardAbilityValues = (payload: SetBoardAbilityValuesPayload) =>
	changeBoardProp({
		...payload,
		prop: "abilityValues",
		value: payload.data,
	});
