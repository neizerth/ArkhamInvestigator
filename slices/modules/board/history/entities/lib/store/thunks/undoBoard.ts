import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import { setBoardFromHistoryDelta } from "./setBoardFromHistoryDelta";

type UndoBoardOptions = PropsWithBoardId;

export const undoBoard =
	(options: UndoBoardOptions): AppThunk =>
	(dispatch) =>
		dispatch(
			setBoardFromHistoryDelta({
				...options,
				delta: -1,
			}),
		);

export const undo = (): AppThunk => (dispatch) =>
	undoBoard({ boardId: "current" });
