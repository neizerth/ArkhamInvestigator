import { Alegreya } from "@assets/fonts";
import {
	TouchableOpacity,
	type TouchableOpacityProps,
} from "@modules/core/touch/shared/ui";
import type { PropsWithFaction } from "@modules/faction/shared/model";
import { FactionFontIcon } from "@modules/faction/shared/ui";
import { color, factionColor, font, size } from "@shared/config";
import { Icon, IconNumber, type IconProps, Row, Text } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import type { TextProps } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
	align-items: center;

	padding: 0 ${size.gap.small}px;
	${({ disabled }: TouchableOpacityProps) =>
		disabled &&
		css`
		opacity: 0.5;
	`}
`;

export const Content: typeof Row = styled(Row)`
	flex: 1;
	padding: ${size.gap.small}px;
	gap: ${size.gap.medium}px;
	align-items: center;
	border-bottom-width: 1px;
	border-bottom-color: ${color.dark20};
`;

export const FactionIcon: typeof FactionFontIcon = styled(
	FactionFontIcon,
).attrs({
	colored: true,
})`
	font-size: 26px;
`;

export const Main: typeof View = styled(View)`
	padding-top: ${size.gap.small}px;
	gap: ${size.gap.small}px;
	flex: 1;
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

type CheckProps = IconProps & PropsWithFaction;

export const Check: FC<CheckProps> = styled(Icon)`
	font-size: 24px;
	${({ faction }: CheckProps) => css`
		color: ${factionColor[faction].darkColor};
	`}
`;

export const Selection: typeof View = styled(View)`

`;

export const SelectedCount: typeof IconNumber = styled(IconNumber)`
	font-size: 18px;
	color: ${color.light10};
`;

export const MultipleSelection: typeof View = styled(View)`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
	background-color: ${color.dark20};
`;
