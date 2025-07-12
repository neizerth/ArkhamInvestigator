import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { useResumeGame, useStartGame } from "../../lib";
import { Button } from "../Button";
import * as C from "./HomePage.components";
export const HomePage = () => {
	const { t } = useAppTranslation();
	const onResume = useResumeGame();
	const onStart = useStartGame();

	return (
		<C.Container>
			<C.Menu />
			<Button onPress={onStart}>{t`New Game`}</Button>
			{onResume && (
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
