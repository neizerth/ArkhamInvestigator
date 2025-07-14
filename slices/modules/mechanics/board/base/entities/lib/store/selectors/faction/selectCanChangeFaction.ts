import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { canChangeFaction } from "../../../logic";

export const selectCanChangeFaction =
	(boardId: BoardId) => (state: RootState) => {
		const investigator = selectBoardProp({ boardId, prop: "investigator" })(
			state,
		);
		if (!investigator) {
			return false;
		}
		return canChangeFaction({ investigator });
	};
