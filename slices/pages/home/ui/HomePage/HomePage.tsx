import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { useModal } from "@modules/core/modal/shared/lib";
import { routes } from "@shared/config";
import {
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

	const hasPreviousGames = useAppSelector((state) =>
		Boolean(selectCurrentBoard(state)),
	);

	const start = useCallback(() => {
		dispatch(startNewGame());
	}, [dispatch]);

	const goToPage = usePage();
	const resume = goToPage(routes.board);

	const [onStart] = usePageLoader(start);
	const [onResume] = usePageLoader(resume);

	const [showWarning] = useModal({
		id: "new-game-warning",
		data: {
			contentType: "text",
			type: "faction",
			faction: "neutral",
			title: t`newGame.start.title`,
			text: t`newGame.start.text`,
			okText: t`Okay`,
			cancelText: t`Cancel`,
		},
		onOk: onStart,
	});

	const onMainPress = hasPreviousGames ? showWarning : onStart;

	return (
		<C.Container>
			<C.Menu />
			<Button onPress={onMainPress}>{t`New Game`}</Button>
			{hasPreviousGames && (
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
