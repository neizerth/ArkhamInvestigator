import type { PropsWithBoard } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import { setBoardFromHistoryDelta } from "./setBoardFromHistoryDelta";

type UndoBoardOptions = PropsWithBoard;

export const redoBoard =
	(options: UndoBoardOptions): AppThunk =>
	(dispatch) =>
		dispatch(
			setBoardFromHistoryDelta({
				...options,
				delta: 1,
			}),
		);
