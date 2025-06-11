import type { AppThunk } from "@shared/model";
import { type SetBoardOptions, setBoard } from "../setBoard";

type Options = Omit<SetBoardOptions, "boardId">;

export const setCurrentBoard =
	(options: Options): AppThunk =>
	(dispatch) => {
		dispatch(
			setBoard({
				...options,
				boardId: "current",
			}),
		);
	};
