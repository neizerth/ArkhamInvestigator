import type { BoardId } from "@modules/board/base/shared/model";
import { selectTurnEnd } from "@modules/mechanics/round/entities/lib";
import type { RootState } from "@shared/model";
import { getIsInactive } from "../../../logic";
import { selectIsDefeated } from "./selectIsDefeated";

export const selectBoardIsInactive =
	(boardId: BoardId) => (state: RootState) => {
		const isTurnEnd = selectTurnEnd(boardId)(state);
		const isDefeated = selectIsDefeated(boardId)(state);
		return getIsInactive({
			isTurnEnd,
			isDefeated,
		});
	};
