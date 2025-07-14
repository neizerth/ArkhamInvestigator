import { selectBoardUsedAbilities } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";

export type SelectAbilityUseInfoOptions = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardAbilityUseInfo =
	({ abilityId, boardId }: SelectAbilityUseInfoOptions) =>
	(state: RootState) => {
		const data = selectBoardUsedAbilities(boardId)(state);
		return data?.find(whereId(abilityId));
	};
