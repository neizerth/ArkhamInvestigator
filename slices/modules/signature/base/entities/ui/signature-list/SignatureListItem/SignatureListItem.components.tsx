import { Alegreya } from "@assets/fonts";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import type { PropsWithFaction } from "@modules/faction/shared/model";
import { FactionFontIcon } from "@modules/faction/shared/ui";
import { color, factionColor, font, size } from "@shared/config";
import { Icon, Row, Text } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import type { TextProps } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
	flex-direction: row;
	gap: ${size.gap.medium}px;
	padding: 0 ${size.gap.default}px;
	align-items: center;
`;

export const FactionIcon: typeof FactionFontIcon = styled(
	FactionFontIcon,
).attrs({
	colored: true,
})`
	font-size: 26px;
`;

export const Main: typeof View = styled(View)`
	gap: ${size.gap.small}px;
`;

export const Header: typeof Row = styled(Row)`
	gap: ${size.gap.default}px;
`;

type TitleProps = TextProps & PropsWithFaction;

export const Title: FC<TitleProps> = styled(Text)`
	${({ faction }: TitleProps) => css`
		color: ${factionColor[faction].darkColor};
	`}
	font-family: ${Alegreya.bold};
	line-height: ${font.size.default}px;
`;

export const Subtitle: typeof Text = styled(Text)`
	font-family: ${Alegreya.italic};
	font-size: ${font.size.small}px;
	line-height: ${font.size.small}px;
`;

export const PackIcon: typeof Icon = styled(Icon)`
	font-size: 14px;
	color: ${color.light10};
`;
