import { selectWifiEnabled } from "@modules/core/network/shared/lib";
import { ArtworksFragment } from "@modules/core/theme/shared/ui";
import { useAppSelector } from "@shared/lib";
import { useTranslation } from "react-i18next";
import { useResumeGame, useStartGame } from "../../lib";
import { Button } from "../Button";
import * as C from "./HomePage.components";

export const HomePage = () => {
	const { t } = useTranslation();
	const wifiEnabled = useAppSelector(selectWifiEnabled);
	const onResume = useResumeGame();
	const onStart = useStartGame();

	const startEnabled = Boolean(!onResume);

	return (
		<C.Container>
			<C.Menu />
			<Button
				onPress={onStart}
				enabled={startEnabled}
			>{t`Single player`}</Button>

			{wifiEnabled && (
				<Button
					styleType="rounded"
					enabled={startEnabled}
				>{t`Multiplayer`}</Button>
			)}
			{onResume && (
				<C.ResumeButton onPress={onResume}>{t`Continue`}</C.ResumeButton>
			)}
			<ArtworksFragment>
				<C.Disclaimer>
					<C.DisclaimerText>{t`app.disclaimer`}</C.DisclaimerText>
				</C.Disclaimer>
			</ArtworksFragment>
		</C.Container>
	);
};
