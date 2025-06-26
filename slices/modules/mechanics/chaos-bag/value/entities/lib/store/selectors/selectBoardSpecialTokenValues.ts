import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getSpecialTokenValuesByCode } from "../../special";

export const selectBoardSpecialTokenValues = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "investigator",
			}),
		],
		(investigator) => {
			if (!investigator) {
				return {};
			}

			return getSpecialTokenValuesByCode(investigator.code);
		},
	);
