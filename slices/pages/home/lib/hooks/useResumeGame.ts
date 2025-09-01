import { unloadAllBoards } from "@modules/board/base/shared/lib";
import { usePage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch, usePageLoader } from "@shared/lib";
import { useCallback } from "react";

export const useResumeGame = () => {
	const dispatch = useAppDispatch();
	const goToPage = usePage();
	const resume = goToPage(routes.board);

	const [onResume] = usePageLoader(resume);

	return useCallback(() => {
		dispatch(unloadAllBoards());
		onResume();
	}, [dispatch, onResume]);
};
