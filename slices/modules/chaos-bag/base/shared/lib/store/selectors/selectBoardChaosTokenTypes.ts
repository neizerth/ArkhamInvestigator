import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { getReferencePartTokens } from "@modules/chaos-bag/effect/entities/lib";
import type { RootState } from "@shared/model";

export const selectBoardChaosTokenTypes =
	(boardId: BoardId) => (state: RootState) => {
		const board = selectBoardById(boardId)(state);
		const parts = board.investigator.tokens_reference;
		return parts.flatMap(getReferencePartTokens);
	};
