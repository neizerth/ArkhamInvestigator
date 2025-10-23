import { getActiveOpacity } from "@shared/lib";
import { useTranslation } from "react-i18next";
import { useResumeGame, useStartGame } from "../../lib";
import { Button } from "../Button";
import * as C from "./HomePage.components";
export const HomePage = () => {
	const { t } = useTranslation();
	const onResume = useResumeGame();
	const onStart = useStartGame();

	const startOpacity = getActiveOpacity(!onResume);

	return (
		<C.Container>
			<C.Menu />
			<Button
				onPress={onStart}
				activeOpacity={startOpacity}
			>{t`New Game`}</Button>
			{onResume && (
				<C.ResumeButton onPress={onResume}>{t`Continue`}</C.ResumeButton>
			)}
			<C.Disclaimer>
				<C.DisclaimerText>{t`app.disclaimer`}</C.DisclaimerText>
			</C.Disclaimer>
		</C.Container>
	);
};
