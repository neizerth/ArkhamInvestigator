import { openNewGameWarning } from "@modules/core/modal/entities/lib";
import {
	selectHasPreviousGame,
	startNewGame,
	useAppDispatch,
	useAppSelector,
	useDispatchAction,
	usePageLoader,
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
