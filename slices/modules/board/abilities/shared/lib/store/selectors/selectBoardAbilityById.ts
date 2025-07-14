import type { BoardId } from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";
import { selectBoardAbilities } from "./selectBoardAbilities";

export type SelectAbilityByIdOptions = {
	boardId: BoardId;
	abilityId: string;
};

export const selectBoardAbilityById =
	({ boardId, abilityId }: SelectAbilityByIdOptions) =>
	(state: RootState) => {
		const abilities = selectBoardAbilities(boardId)(state);
		return abilities.find(whereId(abilityId));
	};
