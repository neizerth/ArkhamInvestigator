import { selectBoardsCount } from "@modules/board/base/shared/lib";
import { usePageLoader } from "@modules/core/router/shared/lib";
import { resumeGame } from "@modules/game/entities/resumeGame";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";

export const useResumeGame = () => {
	const dispatch = useAppDispatch();
	const boardsCount = useAppSelector(selectBoardsCount);
	const hasPreviousGames = boardsCount > 0;
	const resume = useCallback(() => {
		dispatch(resumeGame());
	}, [dispatch]);

	const [onResume] = usePageLoader(resume);

	return hasPreviousGames && onResume;
};
