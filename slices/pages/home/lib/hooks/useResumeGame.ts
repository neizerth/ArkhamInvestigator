import { usePage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch, usePageLoader } from "@shared/lib";

export const useResumeGame = () => {
	const dispatch = useAppDispatch();
	const goToPage = usePage();
	const resume = goToPage(routes.board);

	const [onResume] = usePageLoader(resume);

	return onResume;
};
