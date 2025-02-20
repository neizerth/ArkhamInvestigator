import { color, factionColor, font, size } from "@shared/config";
import type { FC } from "react";
import { ScrollView, Text, View } from "react-native";
import type { TextProps, ViewProps } from "react-native";

import styled, { css } from "styled-components/native";
import type { PropsWithFaction } from "@shared/model/ui";
import { FactionBackground } from "../FactionBackground";
import type { Faction } from "@shared/model";
import { FactionFontIcon, Icon as BaseIcon } from "@shared/ui";
import type { IconProps } from "@shared/ui";

export type ElementWithFaction<T> = FC<T & PropsWithFaction>
export type ViewWithFaction = ElementWithFaction<ViewProps>
export type TextWithFaction = ElementWithFaction<TextProps>

const getBackgroundColor = (faction: Faction) => factionColor[faction].darkBackground;

const textColor = color.light15;
const borderRadius = size.borderRadius.default;

export const Background: typeof FactionBackground = styled(FactionBackground)`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.15;
` 

export const Container: typeof View = styled(View)`
  border-radius: ${borderRadius}px;
`


export const Header: ViewWithFaction = styled(View)`
  ${({ faction }: PropsWithFaction) => css`
    background-color: ${getBackgroundColor(faction)};
  `}
  border-radius: ${borderRadius}px ${borderRadius}px 0px 0px;
  position: relative;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  gap: ${size.gap.medium}px;
  height: 55px;
`

export const Body: ViewWithFaction = styled(View)`
  flex: 1;
  
  border-radius: 0px 0px ${borderRadius}px ${borderRadius}px;
  ${({ faction }: PropsWithFaction) => css`
    background-color: ${getBackgroundColor(faction)};
  `}
  padding: 0 2px 2px 2px;
`

export const Content: typeof View = styled(View)`
  flex: 1;
  
  border-radius: ${borderRadius}px;
  background-color: ${color.dark30};
  padding: ${size.gap.medium}px 0;
`


export const ScrollContainer: typeof ScrollView = styled(ScrollView)`
  flex: 1;
  padding: 0 ${size.gap.medium}px;
`

export const Icon: typeof FactionFontIcon = styled(FactionFontIcon)`
  font-size: 32px;
  color: ${textColor};
`

export type CloseIconProps = Omit<IconProps, 'icon'>

export const CloseIcon: FC<CloseIconProps> = styled(BaseIcon)
  .attrs({
    icon: 'close'
  })`
  font-size: 20px;
  color: ${textColor};
`

export const HeaderContent: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  flex-direction: row;
  position: relative;
  z-index: 2;
  padding: ${size.gap.small}px ${size.gap.medium}px;
  gap: ${size.gap.medium}px;
`

export { View as ScrollContent }

export const HeaderTextContent: typeof View = styled(View)`
  flex: 1;
  width: 100%;
`

const HeaderText: typeof Text = styled(Text)`
  font-size: ${font.size.m}px;
  color: ${textColor};
`

export const Title: typeof Text = styled(HeaderText)`
  font-family: AlegreyaBold;
`

export const Subtitle: typeof Text = styled(HeaderText)`
  font-family: AlegreyaItalic;
`
