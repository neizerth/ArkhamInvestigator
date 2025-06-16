import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardStat as Key } from "../../../../model/board";
import {
	type ChangeBoardPropValuePayload,
	changeBoardPropValue,
} from "../../actions";
import { selectBoardCode } from "../../selectors/props/static/selectBoardCode";

type Options<K extends Key> = Omit<ChangeBoardPropValuePayload<K>, "code">;

export const setBoardPropValue =
	<K extends Key>(options: Options<K>): AppThunk =>
	(dispatch, getState) => {
		const { boardId } = options;
		const state = getState();
		const code = selectBoardCode(boardId)(state);

		if (!code) {
			return;
		}

		dispatch(
			changeBoardPropValue({
				...options,
				code,
			}),
		);
	};
