import { selectBoardId } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectBoardChaosTokenValue } from "@modules/chaos-bag/value/shared/lib";
import type { RootState } from "@shared/model";

export const selectBoardTokenValues =
	(boardId: BoardId) => (state: RootState) => {
		const value = selectBoardChaosTokenValue(state);
		const id = selectBoardId(boardId)(state);
		if (!value || !id) {
			return {};
		}
		return value[id] || {};
	};
