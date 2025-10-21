import { openNewGameWarning } from "@modules/core/modal/entities/base/lib";
import { usePageLoader } from "@modules/core/router/shared/lib";
import {
	selectHasPreviousGame,
	startNewGame,
	useAppDispatch,
	useAppSelector,
	useDispatchAction,
} from "@shared/lib";
import { useCallback } from "react";

export const useStartGame = () => {
	const dispatch = useAppDispatch();
	const hasPreviousGames = useAppSelector(selectHasPreviousGame);

	const start = useDispatchAction(startNewGame);

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
