import { selectMediaVersion } from "@modules/signature/base/shared/lib";
import {
	DEVICE_FONT_SCALE,
	DPR,
	nbsp,
	space,
	wordJoiner,
} from "@shared/config";
import { BUILD_ID, BUILD_VERSION } from "@shared/config/app";
import { useAppSelector } from "@shared/lib";
import { A, Bold, List, Paragraph, Title } from "@shared/ui";
import {
	ContentPage,
	type ContentPageProps,
} from "@widgets/content/content-page";

export type AboutPageProps = Omit<ContentPageProps, "title">;

export const AboutPage = (props: AboutPageProps) => {
	const mediaVersion = useAppSelector(selectMediaVersion);

	return (
		<ContentPage {...props} title="About">
			<Paragraph>
				The information presented in this app about
				{space}
				<A href="https://www.fantasyflightgames.com/en/products/arkham-horror-the-card-game/">
					Arkham Horror: The Card Game{wordJoiner}™
				</A>
				, both textual and graphical, is{nbsp}©{nbsp}Fantasy Flight Games. This
				app is a fan project and is not produced, endorsed, or supported by, or
				affiliated with Fantasy Flight Games.
			</Paragraph>
			<Paragraph>
				This application was created by{" "}
				<A href="https://github.com/neizerth">Vladimir Yazykov</A> and
				contributors to support the Arkham Horror: The Card Game community. The
				source code of this project is available at{" "}
				<A href="https://github.com/neizerth/ArkhamInvestigator">Github</A>.
				Feedback and bug reports are welcome via{" "}
				<A href="https://github.com/neizerth/ArkhamInvestigator/issues">
					Github issues
				</A>{" "}
				or{" "}
				<A href="https://discord.com/channels/225349059689447425/1351550310887460926">
					the dedicated channel
				</A>{" "}
				on the Mythos Busters Discord server.
			</Paragraph>
			<Paragraph>
				All artwork and illustrations are the intellectual property of their
				respective creators. All Arkham Horror: The Card Game™ images and
				graphics are copyrighted by Fantasy Flight Games.
			</Paragraph>
			<Title>Hall of Fame</Title>
			<List>
				<List.Item>
					<Bold>@zzorba</Bold>: Arkham Cards API, Icomoon project, re-used
					Arkham Cards translations
				</List.Item>
				<List.Item>
					<Bold>@kamalisk & ArkhamDB crew</Bold>: Structured game data
				</List.Item>
				<List.Item>
					<Bold>@Egoorka_k</Bold>: Lead Tester
				</List.Item>
				<List.Item>
					<Bold>@coldtoes</Bold>: Artwork repository
				</List.Item>
				<List.Item>
					<Bold>@helios_sunrise</Bold>: Layered investigator arts
				</List.Item>
				<List.Item>
					<Bold>@hauke</Bold>: some AI-uncropped investigator images
				</List.Item>
				<List.Item>
					<Bold>@felice</Bold>: investigator card scans
				</List.Item>
			</List>
			<Title>Credits</Title>
			<List>
				<List.Item>
					<Bold>Card icons</Bold>: Fantasy Flight Games
				</List.Item>
				<List.Item>
					<Bold>Re-used ArkhamCards icons</Bold>: Eugene Sarnetsky
				</List.Item>
				<List.Item>
					<Bold>Button Vector Art</Bold>: vecteezy.com
				</List.Item>
				<List.Item>
					<Bold>Some backgrounds</Bold>: pngtree.com
				</List.Item>
			</List>
			<Title>Testing/Ideas</Title>
			<Paragraph>
				@Egoorka_k, @Evgesha727, @AxilFirst, @User211587, @mkrsa, @Aahz7,
				@ivanmazov82, @mr_zoombee, @sliapy, @vyacheslav_darmin, @CrazyMind667,
				@LexAndrVas, @Anton_Sabaton, @ezhikhin, @Mpmapuo, @alexander_violator,
				@ka777ban, @Amarum, @l_leona_l, @litt_n, @Vladimir_NC, @w1ne_kun,
				@Sitx_1, @Qaedmon, @Dmitry_Korablin, @bezmyateznost, @avblrpa,
				@Lefebvre1121
			</Paragraph>
			<Title>Special Thanks</Title>
			<List>
				<List.Item>
					Thanks to my wife Elisabeth for her understanding and support. I'm the
					happiest man on the Earth. Because of her
				</List.Item>
			</List>
			<Title>Application Info</Title>
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
			<Title>Device Info</Title>
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
