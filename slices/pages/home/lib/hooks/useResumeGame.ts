import { selectBoardsCount } from "@modules/board/base/shared/lib";
import { usePage, usePageLoader } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { useAppSelector } from "@shared/lib";

export const useResumeGame = () => {
	const boardsCount = useAppSelector(selectBoardsCount);
	const goToPage = usePage();
	const resume = goToPage(routes.board);

	const [onResume] = usePageLoader(resume);

	return boardsCount > 0 && onResume;
};
