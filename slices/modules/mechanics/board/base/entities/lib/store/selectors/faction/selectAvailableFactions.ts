import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { getAvailableFactions } from "../../../logic";

export const selectAvailableFactions =
	(boardId: BoardId) => (state: RootState) => {
		const investigator = selectBoardProp({ boardId, prop: "investigator" })(
			state,
		);
		if (!investigator) {
			return [];
		}
		return getAvailableFactions({ investigator });
	};
