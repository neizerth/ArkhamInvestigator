import { formatGameText, getFactionImage } from "@shared/lib";
import type { PropsWithFaction } from "@shared/model";
import { memo } from "react";
import type { ImageBackgroundProps, ViewStyle } from "react-native";
import * as C from "./InvestigatorTitle.components";
import { getTitleStyle } from "./InvestigatorTitle.styles";
import { images } from "./images";

export type InvestigatorTitleProps = Omit<ImageBackgroundProps, "source"> &
	PropsWithFaction & {
		contentContainerStyle?: ViewStyle;
		entityId: number;
		single: boolean;
		parallel: boolean;
		unique: boolean;
		name: string;
		subname: string;
		language: string;
		width: number;
		height: number;
		onPress?: () => void;
		pressable?: boolean;
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
		images,
		parallel,
		faction,
	});

	const style = getTitleStyle(props);

	const activeOpacity = canPress ? 0.2 : 1;
	const showId = !unique && !single;

	return (
		<C.FactionSwitch
			style={contentContainerStyle}
			activeOpacity={activeOpacity}
			onPress={onPress}
		>
			<C.Background
				{...props}
				source={source}
				style={[props.style, style.container]}
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
		</C.FactionSwitch>
	);
};

export const InvestigatorTitleMemo = memo(InvestigatorTitle);
