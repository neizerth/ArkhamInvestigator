import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";

export const selectPinnedSkillChecks =
	(boardId: BoardId) => (state: RootState) => {
		const items =
			selectBoardProp({
				boardId,
				prop: "checkHistory",
			})(state) || [];

		return items.filter(({ pinned }) => pinned);
	};
