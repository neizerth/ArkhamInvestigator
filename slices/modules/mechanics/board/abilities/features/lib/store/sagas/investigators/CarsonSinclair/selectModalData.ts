import {
	selectBoardAbilityUseInfo,
	type setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import {
	selectBoardById,
	selectInvestigatorBoards,
} from "@modules/board/base/shared/lib";
import { getBoardFaction } from "@modules/mechanics/board/base/entities/lib";
import type { PropsWithFaction } from "@shared/model";
import { equals, prop, reject } from "ramda";
import { select } from "redux-saga/effects";

export type SelectModalDataResult = PropsWithFaction & {
	boardIds: number[];
	disabledBoardIds?: number[];
};

export function* selectModalData({
	payload,
}: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId, abilityId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (!board) {
		return;
	}
	const boards: ReturnType<typeof selectInvestigatorBoards> = yield select(
		selectInvestigatorBoards,
	);

	const allBoardIds = boards.map(prop("id"));
	const boardIds = reject(equals(board.id), allBoardIds);
	const faction = getBoardFaction(board);

	const useInfoSelector = selectBoardAbilityUseInfo({
		boardId,
		abilityId,
	});

	const useInfo: ReturnType<typeof useInfoSelector> =
		yield select(useInfoSelector);

	const disabledBoardIds = useInfo?.boardIds || [];

	const data: SelectModalDataResult = {
		faction,
		boardIds,
		disabledBoardIds,
	};

	return data;
}
