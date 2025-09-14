import { selectMediaVersion } from "@modules/signature/base/shared/lib";
import { DEVICE_FONT_SCALE, DPR } from "@shared/config";
import { BUILD_ID, BUILD_VERSION } from "@shared/config/app";
import { useAppSelector } from "@shared/lib";
import { A, Bold, Break, List, Paragraph, Title } from "@shared/ui";
import {
	ContentPage,
	type ContentPageProps,
} from "@widgets/content/content-page";
import { Trans, useTranslation } from "react-i18next";

export type AboutPageProps = Omit<ContentPageProps, "title">;

export const AboutPage = (props: AboutPageProps) => {
	const { t } = useTranslation();
	const mediaVersion = useAppSelector(selectMediaVersion);

	return (
		<ContentPage {...props} title="About">
			<Paragraph>
				<Trans
					i18nKey="about.app"
					components={{
						FFG: (
							<A href="https://www.fantasyflightgames.com/en/products/arkham-horror-the-card-game/" />
						),
					}}
				/>
			</Paragraph>
			<Paragraph>
				<Trans
					i18nKey="about.credits"
					components={{
						Author: <A href="https://github.com/neizerth" />,
						Repo: <A href="https://github.com/neizerth/ArkhamInvestigator" />,
						Issues: (
							<A href="https://github.com/neizerth/ArkhamInvestigator/issues" />
						),
						Discord: (
							<A href="https://discord.com/channels/225349059689447425/1351550310887460926" />
						),
						Telegram: (
							<A href="https://discord.com/channels/225349059689447425/1351550310887460926" />
						),
					}}
				/>
			</Paragraph>
			<Paragraph>{t`about.artwork`}</Paragraph>
			<Title>{t`Hall of Fame`}</Title>
			<List>
				<List.Item>
					<Bold>@zzorba</Bold>: {t`about.hallOfFame.zzorba`}
				</List.Item>
				<List.Item>
					<Bold>@kamalisk & {t`ArkhamDB crew`}</Bold>:{" "}
					{t`about.hallOfFame.arkhamdb`}
				</List.Item>
				<List.Item>
					<Bold>@Egoorka_k</Bold>: {t`Lead Tester`}
				</List.Item>
				<List.Item>
					<Bold>@coldtoes</Bold>: {t`about.hallOfFame.coldtoes`}
				</List.Item>
				<List.Item>
					<Bold>@helios_sunrise</Bold>: {t`about.hallOfFame.helios_sunrise`}
				</List.Item>
				<List.Item>
					<Bold>@hauke</Bold>: {t`about.hallOfFame.hauke`}
				</List.Item>
				<List.Item>
					<Bold>@felice</Bold>: {t`about.hallOfFame.felice`}
				</List.Item>
			</List>
			<Title>{t`Credits`}</Title>
			<List>
				<List.Item>
					<Bold>{t`Card icons`}</Bold>: Fantasy Flight Games
				</List.Item>
				<List.Item>
					<Bold>{t`ArkhamCards icons`}</Bold>:{" "}
					{t`about.credits.arkhamCards.icons`}
				</List.Item>
				<List.Item>
					<Bold>{t`Button Vector Art`}</Bold>: vecteezy.com
				</List.Item>
				<List.Item>
					<Bold>{t`Some backgrounds`}</Bold>: pngtree.com
				</List.Item>
			</List>
			<Title>{t`Translation`}</Title>
			<List>
				<List.Item>
					<Bold>@deronos</Bold>: {t`Korean`}
				</List.Item>
				<List.Item>
					<Bold>@xziying</Bold>: {t`Chinese`}
				</List.Item>
			</List>
			<Title>{t`Testing/Ideas`}</Title>
			<Paragraph>
				@Egoorka_k, @Evgesha727, @AxilFirst, @Rick_Freydin, @User211587, @mkrsa,
				@Aahz7, @ivanmazov82, @mr_zoombee, @sliapy, @vyacheslav_darmin,
				@CrazyMind667, @LexAndrVas, @Anton_Sabaton, @ezhikhin, @Mpmapuo,
				@alexander_violator, @ka777ban, @Amarum, @l_leona_l, @litt_n,
				@Vladimir_NC, @w1ne_kun, @Sitx_1, @Qaedmon, @Dmitry_Korablin,
				@bezmyateznost, @avblrpa, @Lefebvre1121
			</Paragraph>
			<Title>{t`Sponsors`}</Title>
			<Paragraph>
				@kolorono, @Rick_Freydin
				<Break />
				<A href="https://www.patreon.com/arkhamdivider">Patreon:</A>
				<Break />
				@RecedingSamson, @Pink_hawk, The 1 Player Podcast, Andy Lindberg, Nathan
				Wurschmidt
			</Paragraph>
			<Title>{t`Special Thanks`}</Title>
			<List>
				<List.Item>{t`about.credits.beth`}</List.Item>
			</List>
			<Title>{t`Application Info`}</Title>
			<List>
				<List.Item>
					<Bold>Build Version</Bold>: {BUILD_VERSION}
				</List.Item>
				<List.Item>
					<Bold>Build Id</Bold>: {BUILD_ID}
				</List.Item>
				<List.Item>
					<Bold>Media Version</Bold>: {mediaVersion}
				</List.Item>
			</List>
			<Title>{t`Device Info`}</Title>
			<List>
				<List.Item>
					<Bold>DPR</Bold>: {DPR}
				</List.Item>
				<List.Item>
					<Bold>Device Font Scale</Bold>: {DEVICE_FONT_SCALE.toFixed(2)}
				</List.Item>
			</List>
		</ContentPage>
	);
};
