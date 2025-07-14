import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { selectHasAdditionalAction } from "../additional-action/selectHasAdditionalAction";
import { selectBoardAbilities } from "../selectBoardAbilities";

export const selectHasBoardAbilities =
	(boardId: BoardId) => (state: RootState) => {
		const additionalAction = selectHasAdditionalAction(boardId)(state);
		const abilities = selectBoardAbilities(boardId)(state);
		return additionalAction || abilities.length > 0;
	};
