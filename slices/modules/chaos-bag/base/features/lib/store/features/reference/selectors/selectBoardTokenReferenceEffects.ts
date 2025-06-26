import type { BoardId } from "@modules/board/base/shared/model";
import { getChaosBagTokenReferenceEffects } from "@modules/chaos-bag/base/shared/lib/features";
import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagTokenReference } from "./selectChaosBagTokenReference";

export const selectBoardTokenReferenceEffects = (boardId: BoardId) =>
	createSelector([selectChaosBagTokenReference(boardId)], (reference) => {
		return getChaosBagTokenReferenceEffects(reference);
	});
