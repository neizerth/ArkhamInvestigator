import type { InvestigatorNumericStat as Key } from "@shared/model";
import type { AppThunk } from "@shared/model";
import type {
	BoardId,
	ChangeBoardEventPayload,
	InvestigatorBoardValueProp,
} from "../../../../model";
import { selectBoardValueProp } from "../../selectors/props/selectBoardValueProp";
import { setBoardPropValue } from "./setBoardPropValue";

export type DecreaseBoardValuePropInternalPayload<K extends Key> = {
	boardId: BoardId;
	type: InvestigatorBoardValueProp;
	prop: K;
	value: number;
	min: number;
} & ChangeBoardEventPayload;
export const decreaseBoardValuePropInternal =
	<K extends Key>(
		payload: DecreaseBoardValuePropInternalPayload<K>,
	): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentValue = selectBoardValueProp(payload)(state);

		if (typeof currentValue !== "number") {
			return;
		}

		const { min } = payload;

		const value = Math.max(min, currentValue - payload.value);

		dispatch(
			setBoardPropValue({
				...payload,
				value,
			}),
		);
	};
