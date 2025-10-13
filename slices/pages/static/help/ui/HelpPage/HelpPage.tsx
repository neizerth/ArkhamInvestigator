import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { selectInvestigatorByCode as selectByCode } from "@modules/signature/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { Bold, Paragraph, Text, Title } from "@shared/ui";
import { ContentPage } from "@widgets/content/content-page";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import * as C from "./HelpPage.components";

export const HelpPage = () => {
	const { t } = useTranslation();
	const LolaHayes = useAppSelector(selectByCode(InvesigatorCode.LolaHayes));
	const DanielaReyes = useAppSelector(
		selectByCode(InvesigatorCode.DanielaReyes),
	);
	const KymaniJones = useAppSelector(selectByCode(InvesigatorCode.KymaniJones));
	const PrestonFairmont = useAppSelector(
		selectByCode(InvesigatorCode.PrestonFairmont),
	);
	const WendyAdams = useAppSelector(
		selectByCode(InvesigatorCode.WendyAdams.base),
	);
	return (
		<ContentPage title="Help">
			<Title>{t`Scroll`}</Title>
			<Text>{t`board.help.scroll`}</Text>

			<Title>{t`Short Press`}</Title>
			<Text>
				<C.Icon icon="health" />, <C.Icon icon="sanity" />,{" "}
				<C.Icon icon="resource" />, <C.Icon icon="card-outline" />
				{" - "}
				{t`board.help.press.main`}
			</Text>
			<Text>
				<C.Icon icon="action" />
				{" - "}
				{t`board.help.press.action`}
			</Text>
			<Text>
				<C.Icon icon="clue" /> - {t`board.help.press.clue`}
			</Text>
			<Text>
				<C.Icon icon="willpower" />, <C.Icon icon="intellect" />,{" "}
				<C.Icon icon="combat" />, <C.Icon icon="agility" />
				{" - "}
				{t`board.help.press.skills`}
			</Text>
			<Text>
				<C.Icon icon="undo" />
				{" - "}
				{t`board.help.press.undo`}
			</Text>
			<Text>
				<C.Icon icon="redo" />
				{" - "}
				{t`board.help.press.redo`}
			</Text>
			<Text>
				<C.Icon icon="chaos-bag-thin" />
				{" - "}
				{t`board.help.press.chaosBag`}
			</Text>

			<Title>{t`Press and hold`}</Title>
			<Text>{t`board.help.hold.freeArea`}</Text>

			<Title>{t`Long Press`}</Title>
			<Text>
				<C.Icon icon="health" />, <C.Icon icon="sanity" />,{" "}
				<C.Icon icon="action" />, <C.Icon icon="card-outline" />
				{" - "}
				{t`board.help.longPress.main`}
			</Text>
			<Text>
				<C.Icon icon="resource" />, <C.Icon icon="clue" />
				{" - "}
				{t`board.help.longPress.secondary`}
			</Text>
			<Text>
				<C.Icon icon="undo" />
				{" - "}
				{t`board.help.longPress.undo`}
			</Text>
			<Text>
				<C.Icon icon="redo" />
				{" - "}
				{t`board.help.longPress.redo`}
			</Text>
			<Text>
				<C.Icon icon="chaos-bag-thin" />
				{" - "}
				{t`board.help.longPress.chaosBag`}
			</Text>
			<Paragraph>{t`board.help.longPress.investigatorSelect`}</Paragraph>

			<Title>{t`Swipe gestures`}</Title>

			<Text>
				<C.Icon icon="health" />, <C.Icon icon="sanity" />,{" "}
				<C.Icon icon="action" />, <C.Icon icon="card-outline" />,{" "}
				<C.Icon icon="resource" />
				{" - "}
				{t`board.help.swipeLeft.main`}
			</Text>

			<Text>
				<C.Icon icon="health" />, <C.Icon icon="action" />
				{" - "}
				{t`board.help.swipeRight.main`}
			</Text>

			<Title>{t`board.help.details`}</Title>

			<Paragraph>{t`board.help.details.toggle`}</Paragraph>

			<Paragraph>{t`board.help.details.trackers`}</Paragraph>

			<Text>
				<C.Icon icon="icomoonfree-lock" />, <C.Icon icon="unlocked" />
				{" - "}
				{t`board.help.syncScenarioClues`}
			</Text>

			<Text>
				<C.Icon icon="resign" />
				{" - "}
				{t`board.help.details.goHome`}
			</Text>

			<Text>
				<C.Icon icon="info" />
				{" - "}
				{t`board.help.details.info`}
			</Text>

			<Text>
				<C.Icon icon="stopwatch" />
				{" - "}
				{t`board.help.details.roundReference`}
			</Text>

			<Text>
				<C.Icon icon="wrench" />
				{" - "}
				{t`board.help.details.settings`}
			</Text>

			<Text>
				<C.Icon icon="repeat" />
				{" - "}
				{t`board.help.details.clearBoard`}
			</Text>

			<Title>{t`Chaos Bag`}</Title>

			<Paragraph>{t`board.help.chaosBag`}</Paragraph>

			<Text>
				<C.Icon icon="chaos-bag-thin" />
				{" - "}
				{t`board.help.chaosBag.swipe`}
			</Text>

			<Text>
				<C.Icon icon="reply" />
				{" - "}
				{t`board.help.chaosBag.returnAll`}
			</Text>
			<C.IconText value={t`board.help.chaosBag.return`} />
			<Text>
				<C.Icon icon="plus-thin" />
				{" - "}
				{t`board.help.chaosBag.oneMore`}
			</Text>

			<C.IconText value={t`board.help.chaosBag.cancelToken`} />

			<Text>
				<C.Icon icon="list2" />
				{" - "}
				{t`board.help.chaosBag.reference`}
			</Text>

			<Paragraph>
				<C.IconText value={t`board.help.chaosBag.token.press`} />
			</Paragraph>

			<Paragraph>{t`board.help.chaosBag.token.longPress`}</Paragraph>

			<Title>{t`Calculator`}</Title>
			<Text>
				<C.Icon icon="history" /> / <C.Icon icon="calculator" />
				{" - "}
				{t`board.help.calculator.toggleKeyboard`}
			</Text>
			<Text>
				<C.Icon icon="trash" />
				{" - "}
				{t`board.help.calculator.clearHistory`}
			</Text>
			<Paragraph>{t`board.help.calculator.result`}</Paragraph>
			<Paragraph>{t`board.help.calculator.history`}</Paragraph>

			<Paragraph>{t`board.help.calculator.expression`}</Paragraph>

			<Paragraph>{t`board.help.calculator.buttons`}</Paragraph>

			<Paragraph>{t`board.help.calculator.difficulty`}</Paragraph>

			<Paragraph>{t`board.help.calculator.history.actions`}</Paragraph>

			<Text>
				<C.Icon icon="trash" />
				{" - "}
				{t`board.help.calculator.history.remove`}
			</Text>

			<Text>
				<C.Icon icon="tag" />
				{" - "}
				{t`board.help.calculator.history.setName`}
			</Text>

			<Text>
				<C.Icon icon="pushpin" />
				{" - "}
				{t`board.help.calculator.history.pin`}
			</Text>

			<Title>{t`Pinned calculations`}</Title>

			<Paragraph>{t`board.help.pins.toggle`}</Paragraph>
			<Paragraph>{t`board.help.pins.press`}</Paragraph>
			<Paragraph>{t`board.help.pins.longPress`}</Paragraph>
			<Paragraph>{t`board.help.pins.swipe`}</Paragraph>

			<Title>{t`Investigator Special Actions`}</Title>
			<Text>
				<C.Icon icon="per_investigator" />, <C.Icon icon="free" />,{" "}
				<C.Icon icon="reaction" />
				{" - "}
				{t`board.help.special.additionalAction`}
			</Text>

			<View>
				<C.ListTitle>
					<C.Icon icon="neutral" />
					<Bold>{LolaHayes?.name}</Bold>
				</C.ListTitle>
				<View>
					<C.IconText value={t`board.help.special.lola`} />
				</View>
			</View>
			<View>
				<C.ListTitle>
					<C.Icon icon="guardian" />
					<Bold>{DanielaReyes?.name}</Bold>
				</C.ListTitle>
				<View>
					<C.IconText value={t`board.help.special.daniela`} />
				</View>
			</View>
			<View>
				<C.ListTitle>
					<C.Icon icon="rogue" />
					<Bold>{KymaniJones?.name}</Bold>
				</C.ListTitle>
				<C.IconText value={t`board.help.special.kymani`} />
			</View>

			<View>
				<C.ListTitle>
					<C.Icon icon="rogue" />
					<Bold>{PrestonFairmont?.name}</Bold>
				</C.ListTitle>
				<C.IconText value={t`board.help.special.preston`} />
			</View>
			<View>
				<C.ListTitle>
					<C.Icon icon="survivor" />
					<Bold>{WendyAdams?.name}</Bold>
				</C.ListTitle>
				<C.IconText value={t`board.help.special.wendy`} />
			</View>
		</ContentPage>
	);
};
