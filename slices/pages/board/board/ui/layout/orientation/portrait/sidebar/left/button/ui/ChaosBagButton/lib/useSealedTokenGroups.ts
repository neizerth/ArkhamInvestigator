import type { BoardId } from "@modules/board/base/shared/model";
import { selectSealedOnBoardTokens } from "@modules/chaos-bag/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import { groupBy, prop } from "ramda";

export const useSealedTokenGroups = (boardId: BoardId) => {
	const sealedTokens = useAppSelector(selectSealedOnBoardTokens(boardId));
	const groups = groupBy(prop("type"), sealedTokens);
	return Object.values(groups).map((tokens) => ({
		type: tokens[0].type,
		count: tokens.length,
	}));
};
