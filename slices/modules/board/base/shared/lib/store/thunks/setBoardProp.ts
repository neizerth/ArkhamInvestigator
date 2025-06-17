import { selectBoardCode } from "@modules/board/base/shared/lib";
import type { BoardKey } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import { type ChangeBoardPropPayload, changeBoardProp } from "../actions";

export type SetBoardPropPayload<K extends BoardKey> = Omit<
	ChangeBoardPropPayload<K>,
	"code"
>;

export const setBoardProp =
	<K extends BoardKey>(options: SetBoardPropPayload<K>): AppThunk =>
	(dispatch, getState) => {
		const { boardId } = options;
		const state = getState();
		const code = selectBoardCode(boardId)(state);

		if (!code) {
			return;
		}

		dispatch(
			changeBoardProp({
				...options,
				code,
			}),
		);
	};
