import { usePage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import {
	selectHasPreviousGame,
	useAppSelector,
	usePageLoader,
} from "@shared/lib";

export const useResumeGame = () => {
	const goToPage = usePage();
	const resume = goToPage(routes.board);

	const hasPreviousGame = useAppSelector(selectHasPreviousGame);

	const [onResume] = usePageLoader(resume);

	return hasPreviousGame && onResume;
};
