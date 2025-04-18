import { useAppTranslation } from "@features/i18n";
import { routes } from "@shared/config";
import {
	selectCurrentBoard,
	useAppDispatch,
	useAppSelector,
	usePage,
	usePageLoader,
} from "@shared/lib";
import { useCallback } from "react";
import { startNewGame } from "../../lib";
import { Button } from "../Button";
import * as C from "./HomePage.components";
export const HomePage = () => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	const previousGames = useAppSelector((state) =>
		Boolean(selectCurrentBoard(state)),
	);

	const start = useCallback(() => {
		dispatch(startNewGame());
	}, [dispatch]);

	const goToPage = usePage();
	const resume = goToPage(routes.board);

	const [onStart] = usePageLoader(start);
	const [onResume] = usePageLoader(resume);

	return (
		<C.Container>
			<C.Menu />
			<Button onPress={onStart}>{t`New Game`}</Button>
			{previousGames && (
				<C.ResumeButton onPress={onResume}>{t`Continue`}</C.ResumeButton>
			)}
			<C.Disclaimer>
				<C.DisclaimerText>
					Arkham Horror: The Card Game™ and all related content © Fantasy Flight
					Games (FFG). This app is not produced, endorsed by or affiliated with
					FFG.
				</C.DisclaimerText>
			</C.Disclaimer>
		</C.Container>
	);
};
