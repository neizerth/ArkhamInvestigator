import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { tokenValueModifications } from "../../../config";

export const selectBoardChaosTokenValueModifications =
	(boardId: BoardId) => (state: RootState) => {
		const investigator = selectBoardProp({
			boardId,
			prop: "investigator",
		})(state);

		const modification = tokenValueModifications[investigator.code];

		if (!modification) {
			return {};
		}

		return modification();
	};
