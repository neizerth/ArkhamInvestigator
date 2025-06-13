import { selectBoardCode } from "@modules/board/base/shared/lib";
import type { InvestigatorBoardStat as Key } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import {
	type ChangeBoardPropValuePayload,
	changeBoardPropValue,
} from "../actions";

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
