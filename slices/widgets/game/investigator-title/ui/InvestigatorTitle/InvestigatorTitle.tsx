import { titleImages } from "@assets/images/game/title";
import { formatGameText, getFactionImage } from "@shared/lib";
import type { PropsWithFaction } from "@shared/model";
import type { ImageBackgroundProps } from "@shared/ui";
import { memo } from "react";
import type { ViewStyle } from "react-native";
import * as C from "./InvestigatorTitle.components";
import { getTitleStyle } from "./InvestigatorTitle.styles";

export type InvestigatorTitleProps = Omit<ImageBackgroundProps, "source"> &
	InvestigatoTitleBaseProps & {
		contentContainerStyle?: ViewStyle;
		onPress?: () => void;
		pressable?: boolean;
		width: number;
		height: number;
	};

export type InvestigatoTitleBaseProps = PropsWithFaction & {
	entityId: number;
	single: boolean;
	parallel: boolean;
	unique: boolean;
	name: string;
	subname: string;
	language: string;
};

export const InvestigatorTitle = (props: InvestigatorTitleProps) => {
	const {
		contentContainerStyle,
		pressable: canPress = false,
		faction,
		parallel,
		onPress,
		unique,
		entityId,
		single,
	} = props;

	const name = formatGameText(props.name);
	const subname = formatGameText(props.subname);

	const source = getFactionImage({
		images: titleImages,
		parallel,
		faction,
	});

	const style = getTitleStyle(props);

	const activeOpacity = canPress ? 0.2 : 1;
	const showId = !unique && !single;

	return (
		<C.Container
			style={[contentContainerStyle]}
			activeOpacity={activeOpacity}
			onPress={onPress}
		>
			<C.Background
				{...props}
				source={source}
				style={[props.style, style.background]}
			>
				<C.Title style={style.title}>
					{unique && <C.Unique style={style.unique} />}
					<C.TitleText style={style.titleText}>{name}</C.TitleText>
					{showId && <C.Id style={style.id}> ({entityId})</C.Id>}
				</C.Title>
				<C.Subtitle style={style.subtitle}>
					<C.SubtitleText style={style.subtitleText}>{subname}</C.SubtitleText>
				</C.Subtitle>
			</C.Background>
		</C.Container>
	);
};

export const InvestigatorTitleMemo = memo(InvestigatorTitle);
