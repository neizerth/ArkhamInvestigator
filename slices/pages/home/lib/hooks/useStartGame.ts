import { selectBoardsCount } from "@modules/board/base/shared/lib";
import { usePageLoader } from "@modules/core/router/shared/lib";
import { openNewGameWarning } from "@modules/game/entities/openNewGameWarning";
import { startNewGame } from "@modules/game/entities/startNewGame";
import type { GameType } from "@modules/game/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";

export const useStartGame = (type: GameType) => {
	const dispatch = useAppDispatch();
	const boardsCount = useAppSelector(selectBoardsCount);
	const hasPreviousGames = boardsCount > 0;

	const start = useCallback(() => {
		dispatch(startNewGame({ type }));
	}, [dispatch, type]);

	const [onStart] = usePageLoader(start);

	const showWarning = useCallback(() => {
		dispatch(
			openNewGameWarning({
				boardId: "current",
				type,
			}),
		);
	}, [dispatch, type]);

	return hasPreviousGames ? showWarning : onStart;
};
