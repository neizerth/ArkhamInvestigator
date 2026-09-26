import { factionColor } from "@shared/config";
import type { FC } from "react";
import { View } from "react-native";
import type { TextProps, ViewProps } from "react-native";

import { GameText } from "@modules/core/theme/shared/ui/GameText";
import { ThemeFactionFontIcon } from "@modules/core/theme/shared/ui/faction/ThemeFactionFontIcon";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import type { Faction } from "@shared/model";
import type { PropsWithFaction } from "@shared/model/ui";
import {
	Icon as BaseIcon,
	Button,
	type ButtonProps,
	type IconProps,
	Row,
	ScrollView,
} from "@shared/ui";
import styled, { css } from "styled-components/native";
import { FactionSVGPattern } from "../FactionSVGPattern";
export type ElementWithFaction<T> = FC<T & PropsWithFaction>;
export type ViewWithFaction = ElementWithFaction<ViewProps>;
export type TextWithFaction = ElementWithFaction<TextProps>;

const getBackgroundColor = (faction: Faction) =>
	factionColor[faction].darkBackground;

export const Background: typeof FactionSVGPattern = styled(FactionSVGPattern)`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const Container: typeof View = styled(View)`
  border-radius: ${({ theme }) => theme.size.borderRadius.default}px;
`;

export const Header: ViewWithFaction = styled(View)`
  ${({ faction, theme }) => css`
    background-color: ${getBackgroundColor(faction)};
    border-radius: ${theme.size.borderRadius.default}px ${theme.size.borderRadius.default}px 0px 0px;
    gap: ${theme.size.gap.medium}px;
  `}
  position: relative;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  height: 55px;
`;

export const Body: ViewWithFaction = styled(View)`
  flex: 1;
  ${({ faction, theme }) => css`
    background-color: ${getBackgroundColor(faction)};
    border-radius: 0px 0px ${theme.size.borderRadius.default}px ${theme.size.borderRadius.default}px;
  `}
  padding: 0 2px 2px 2px;
`;

export const Content: typeof View = styled(View)`
  flex: 1;
  ${({ theme: { color, size } }) => css`
    border-radius: ${size.borderRadius.default}px;
    background-color: ${color.dark30};
    padding: ${size.gap.medium}px 0px;
    gap: ${size.gap.default}px;
  `}
`;

export const ScrollContainer: typeof ScrollView = styled(ScrollView)`
  flex: 1;
  padding: 0 ${({ theme }) => theme.size.gap.default}px;
`;

export const Actions: typeof Row = styled(Row)`
  ${({ theme: { size } }) => css`
    padding: 0 ${size.gap.default}px;
    gap: ${size.gap.default}px;
  `}
`;

export const Action: typeof Button = styled(Button)`
  background-color: ${({ theme }) => theme.color.dark15};
  flex: 1;
`;

type PrimaryActionProps = ButtonProps & PropsWithFaction;

export const PrimaryAction = styled(Button)<PrimaryActionProps>`
  flex: 1;
  position: relative;
  overflow: hidden;
  ${({ faction }) => css`
    background-color: ${getBackgroundColor(faction)};
  `}
`;

export const OKBackground: typeof Background = styled(Background).attrs({
	height: 55,
})`
  position: absolute;
`;

export const Icon: typeof ThemeFactionFontIcon = styled(ThemeFactionFontIcon)`
  font-size: 32px;
  line-height: 32px;
  width: 32px;
  color: ${({ theme }) => theme.color.light15};
`;

export type CloseIconProps = Omit<IconProps, "icon">;

export const CloseIcon: FC<CloseIconProps> = styled(BaseIcon).attrs({
	icon: "close",
})`
  font-size: 20px;
  width: 20px;
  color: ${({ theme }) => theme.color.light15};
`;

export const Close: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

export const HeaderContent: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  flex-direction: row;
  position: relative;
  z-index: 2;
  ${({ theme: { size } }) => css`
    padding: ${size.gap.small}px ${size.gap.medium}px;
    padding-right: 0;
    gap: ${size.gap.medium}px;
  `}
`;

export { View as ScrollContent };

export const HeaderTextContent: typeof View = styled(View)`
  flex: 1;
  width: 100%;
  padding: ${({ theme }) => theme.size.gap.small}px 0;
`;

const HeaderText: typeof GameText = styled(GameText)`
  ${({ theme: { color, font } }) => css`
    font-size: ${font.size.default}px;
    color: ${color.light15};
  `}
`;

export const Title: typeof HeaderText = styled(HeaderText).attrs(
	({ theme }) => ({
		componentStyles: {
			text: {
				fontFamily: theme.fontFamily.Alegreya.bold,
			},
		},
	}),
)`
  font-family: ${({ theme }) => theme.fontFamily.Alegreya.bold};
`;

export const Subtitle: typeof HeaderText = styled(HeaderText).attrs(
	({ theme }) => ({
		componentStyles: {
			text: {
				fontFamily: theme.fontFamily.Alegreya.italic,
			},
		},
	}),
)`
  font-family: ${({ theme }) => theme.fontFamily.Alegreya.italic};
`;
