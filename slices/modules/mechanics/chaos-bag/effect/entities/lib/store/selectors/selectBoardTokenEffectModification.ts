import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectReferenceCardTokenEffects } from "@shared/lib";
import type { RootState } from "@shared/model";
import { tokenEffectModifications } from "../../../config";

export const selectBoardTokenEffectModification =
	(boardId: BoardId) => (state: RootState) => {
		const board = selectBoardById(boardId)(state);
		const reference = selectReferenceCardTokenEffects(state);

		if (!isBoardExists(board)) {
			return [];
		}

		const { code } = board.investigator;
		const modification = tokenEffectModifications[code];

		if (!modification) {
			return [];
		}

		return modification({ reference });
	};
