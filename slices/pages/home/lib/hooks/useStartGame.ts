import { selectBoardsCount } from "@modules/board/base/shared/lib";
import { openNewGameWarning } from "@modules/core/modal/entities/base/lib";
import { usePageLoader } from "@modules/core/router/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";

export const useStartGame = () => {
	const dispatch = useAppDispatch();
	const boardsCount = useAppSelector(selectBoardsCount);
	const hasPreviousGames = boardsCount > 0;

	const start = useCallback(() => {
		dispatch(startNewGame());
	}, [dispatch]);

	const [onStart] = usePageLoader(start);

	const showWarning = useCallback(() => {
		dispatch(
			openNewGameWarning({
				boardId: "current",
			}),
		);
	}, [dispatch]);

	return hasPreviousGames ? showWarning : onStart;
};
