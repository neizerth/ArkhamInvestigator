import type {
	BoardId,
	ChangeBoardEventPayload,
	InvestigatorBoardValueProp,
} from "../../../../model";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";
import { setBoardPropValue } from "./setBoardPropValue";

import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";

export type IncreaseBoardValuePropInternalPayload<K extends Key> = {
	boardId: BoardId;
	type: InvestigatorBoardValueProp;
	prop: K;
	value: number;
	max: number;
} & ChangeBoardEventPayload;
export const increaseBoardValuePropInternal =
	<K extends Key>(
		payload: IncreaseBoardValuePropInternalPayload<K>,
	): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentValue = selectBoardValueProp(payload)(state);

		if (typeof currentValue !== "number") {
			return;
		}

		const { max } = payload;

		const value = Math.min(max, currentValue + payload.value);

		dispatch(
			setBoardPropValue({
				...payload,
				value,
			}),
		);
	};
