import { selectBoardCode } from "@modules/board/base/shared/lib";
import type { InvestigatorBoardValueProp as Key } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import {
	type ChangeBoardValuePartPayload,
	changeBoardValuePart,
} from "../actions";

type Options<K extends Key> = Omit<ChangeBoardValuePartPayload<K>, "code">;

export const setBoardValuePart =
	<K extends Key>(options: Options<K>): AppThunk =>
	(dispatch, getState) => {
		const { boardId } = options;
		const state = getState();
		const code = selectBoardCode(boardId)(state);

		if (!code) {
			return;
		}

		dispatch(
			changeBoardValuePart({
				...options,
				code,
			}),
		);
	};
