import {
	type TranslatableProps,
	selectLanguage,
	useAppTranslation,
} from "@features/i18n";
import { LayoutContext } from "@pages/board/config";
import { getTitleSize, useFaction, useFactionImage } from "@pages/board/lib";
import type { HeaderLayout } from "@pages/board/model";
import {
	formatGameText,
	selectCurrentBoard,
	selectInvestigatorBoards,
	useAppSelector,
} from "@shared/lib";
import type { Faction } from "@shared/model";
import { useContext } from "react";
import type {
	ImageBackgroundProps,
	ImageProps,
	TouchableOpacityProps,
	ViewStyle,
} from "react-native";
import * as C from "./InvestigatorTitle.components";
import { getTitleStyle } from "./InvestigatorTitle.styles";
import { images } from "./images";

export type InvestigatorTitleProps = Omit<ImageBackgroundProps, "source"> & {
	contentContainerStyle?: ViewStyle;
};

export const InvestigatorTitle = ({
	contentContainerStyle,
	...props
}: InvestigatorTitleProps) => {
	const { layout } = useContext(LayoutContext);
	const { translate } = useAppTranslation();
	const single = useAppSelector(
		(state) => selectInvestigatorBoards(state).length === 1,
	);
	const { investigator, isParallel, unique, id } =
		useAppSelector(selectCurrentBoard);
	const { faction, canChangeFaction, nextFaction } = useFaction();

	const [name, nameLanguage] = translate(investigator.name);
	const [subname] = translate(investigator.subname || "");
	const formattedName = formatGameText(name);
	const formattedSubname = formatGameText(subname);

	const box = getTitleSize(layout);
	const source = useFactionImage(images);

	const style = getTitleStyle({
		view: box,
		faction,
		isParallel,
		language: nameLanguage,
	});

	const activeOpacity = canChangeFaction ? 0.2 : 1;
	const showId = !unique && !single;

	return (
		<C.FactionSwitch
			style={contentContainerStyle}
			activeOpacity={activeOpacity}
			onPress={nextFaction}
		>
			<C.Background
				{...props}
				{...box}
				source={source}
				style={[props.style, style.container]}
			>
				<C.Title style={style.title}>
					{unique && <C.Unique style={style.unique} />}
					<C.TitleText style={style.titleText}>{formattedName}</C.TitleText>
					{showId && <C.Id style={style.id}> ({id})</C.Id>}
				</C.Title>
				<C.Subtitle style={style.subtitle}>
					<C.SubtitleText style={style.subtitleText}>
						{formattedSubname}
					</C.SubtitleText>
				</C.Subtitle>
			</C.Background>
		</C.FactionSwitch>
	);
};
