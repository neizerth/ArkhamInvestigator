import { BackspaceImage, rule } from "./images/images";

import { UnscaledText, Row as BaseRow, TouchableOpacity } from "@shared/ui";
import { View, Text, type ImageProps, Image, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import * as Buttons from "../KeyboardButton";
import { color, font, size } from '@shared/config';
import type { FC } from 'react';
import { Copasetic } from "@shared/fonts"
import RuleBottom from './images/rule.svg'
import type { SvgProps } from 'react-native-svg';
import type { PropsWithBox } from '@shared/model';
import { StatsKeyboard } from '../StatsKeyboard';
import { LayoutContainer, LayoutContainerProps } from "../../LayoutContainer";
import { skillCheckColor } from "@pages/skill-check/config";


export const Container: typeof View = styled(View)`
  padding: 0 ${size.gap.default}px;
  padding-bottom: ${size.gap.large}px;  
`

type ContentProps = ViewProps & {
  border?: boolean;
}

export const Content: FC<ContentProps> = styled(View)`
  align-items: center;
  ${({ border }: ContentProps) => border && css`
    border-top-width: 1px;
    border-top-color: ${skillCheckColor.border};
  `}
`

export const Row: typeof BaseRow = styled(BaseRow)`
  align-items: stretch;
  justify-content: center;
`

export const StatsRow: typeof BaseRow = styled(Row)`
  width: 280px
`

export const Back: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Col: typeof View = styled(View)`
  flex: 1;
`

const buttonStyle = css`
  flex: 1;
`

export const Button: typeof Buttons.TextButton = styled(Buttons.TextButton)`
  ${buttonStyle}
`
export const CustomButton: typeof Buttons.CustomButton = styled(Buttons.CustomButton)`
  ${buttonStyle}
`

export const Operator: typeof Button = styled(Button)
  .attrs({
    buttonType: 'primary'
  })`
    ${buttonStyle}
  `

export const Stats: typeof StatsKeyboard = styled(StatsKeyboard)`
  flex: 3;
`

export const Backspace: typeof BackspaceImage = styled(BackspaceImage)
  .attrs({
    width: 32,
    height: 32,
    fill: color.light10,
  })`
    position: relative;
    left: -2px;
  `

export const Placeholder: typeof View = styled(View)`
  flex: 1;
`

export const EqualsText: typeof UnscaledText = styled(UnscaledText)`
  color: ${color.light10};
  font-family: ${Copasetic.regular};
  font-size: ${font.size.lead}px;
`

type RuleProps = SvgProps & {
  historyShown: boolean
}


export const Rule: FC<RuleProps> = styled(RuleBottom)
  .attrs({
    width: 290,
    height: 40
  })`
  ${({ historyShown }: RuleProps) => historyShown && css`
    transform: rotate(180deg);
  `}
  margin-bottom: -5px;
`