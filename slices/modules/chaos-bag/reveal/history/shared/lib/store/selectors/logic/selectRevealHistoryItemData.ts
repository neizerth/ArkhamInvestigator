import { selectBoardId } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";

import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/entities/lib";
import {
	selectChaosBagSkillCheckExpression,
	selectChaosBagSkillCheckTitle,
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { createRevealHistoryItemData } from "../../../logic";

export const selectRevealHistoryItemData =
	(boardId: BoardId) => (state: RootState) => {
		const id = selectBoardId(boardId)(state);
		const skillCheckType = selectChaosBagSkillCheckType(state);
		const skillCheckValue = selectChaosBagSkillValue(state);
		const skillCheckExpression = selectChaosBagSkillCheckExpression(state);
		const title = selectChaosBagSkillCheckTitle(state);
		const tokens = selectRevealedTokens(state);

		if (typeof id === "undefined") {
			return;
		}
		return createRevealHistoryItemData({
			boardId: id,
			skillCheckType,
			skillCheckValue,
			skillCheckExpression,
			title,
			tokens,
		});
	};
