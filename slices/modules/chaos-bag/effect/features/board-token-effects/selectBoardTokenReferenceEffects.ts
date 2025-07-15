import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getChaosBagTokenReferenceEffects } from "../../entities/lib";
import { selectChaosBagTokenReference } from "./selectChaosBagTokenReference";

export const selectBoardTokenReferenceEffects = (boardId: BoardId) =>
	createSelector([selectChaosBagTokenReference(boardId)], (reference) => {
		return getChaosBagTokenReferenceEffects(reference);
	});
