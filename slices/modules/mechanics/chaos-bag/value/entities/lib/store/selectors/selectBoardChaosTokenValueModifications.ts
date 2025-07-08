import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { tokenValueModifications } from "../../../config";

export const selectBoardChaosTokenValueModifications = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "investigator",
			}),
		],
		(investigator) => {
			const modification = tokenValueModifications[investigator.code];

			if (!modification) {
				return {};
			}

			return modification();
		},
	);
