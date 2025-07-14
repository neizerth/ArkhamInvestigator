import { selectBoardCheckHistory } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { SkillCheckHistoryItem } from "@modules/board/skill-check/shared/model";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";

type Options = PropsWithBoardId & {
	id: string;
};

const fallbackItem: SkillCheckHistoryItem = {
	id: "fallback",
	type: "health",
	expression: [],
	value: 0,
};

export const selectSkillCheckHistoryItem =
	({ boardId, id }: Options) =>
	(state: RootState) => {
		const history = selectBoardCheckHistory(boardId)(state) || [];

		return history.find(whereId(id)) || fallbackItem;
	};
