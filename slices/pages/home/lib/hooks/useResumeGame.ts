import { routes } from "@shared/config";
import {
	selectHasPreviousGame,
	useAppSelector,
	usePage,
	usePageLoader,
} from "@shared/lib";

export const useResumeGame = () => {
	const goToPage = usePage();
	const resume = goToPage(routes.board);

	const hasPreviousGame = useAppSelector(selectHasPreviousGame);

	const [onResume] = usePageLoader(resume);

	return hasPreviousGame && onResume;
};
