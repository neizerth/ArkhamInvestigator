import { selectBoardAbilities } from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { getAbilityModification } from "../../logic";

export const selectBoardSpecialAbilities =
	(boardId: BoardId) => (state: RootState) => {
		const abilities = selectBoardAbilities(boardId)(state);
		const board = selectBoardById(boardId)(state);
		return abilities.map((ability) =>
			getAbilityModification({
				ability,
				board,
			}),
		);
	};
