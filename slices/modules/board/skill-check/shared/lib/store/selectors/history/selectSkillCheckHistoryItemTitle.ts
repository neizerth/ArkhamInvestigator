import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { selectSkillCheckHistoryItem } from "./selectSkillCheckHistoryItem";

type Options = PropsWithBoardId & {
	id: string;
};

export const selectSkillCheckHistoryItemTitle =
	(options: Options) => (state: RootState) => {
		const item = selectSkillCheckHistoryItem(options)(state);
		return item?.title;
	};
