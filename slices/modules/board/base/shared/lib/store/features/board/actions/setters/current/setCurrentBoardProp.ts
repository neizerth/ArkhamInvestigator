import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import { type SetBoardPropOptions, setBoardProp } from "../setBoardProp";

type Key = keyof InvestigatorBoard;
type Options<T extends Key> = Omit<SetBoardPropOptions<T>, "boardId">;

export const setCurrentBoardProp =
	<T extends Key>(options: Options<T>): AppThunk =>
	(dispatch) => {
		dispatch(
			setBoardProp({
				...options,
				boardId: "current",
			}),
		);
	};
