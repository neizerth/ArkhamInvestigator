import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";

export const selectIsParallel = (boardId: BoardId) => (state: RootState) => {
	const investigator = selectBoardProp({
		boardId,
		prop: "investigator",
	})(state);
	return investigator?.type === "parallel";
};
