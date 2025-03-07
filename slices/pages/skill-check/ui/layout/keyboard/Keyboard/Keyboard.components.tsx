import BackspaceImage from './images/backspace.svg';
import RuleImage from './images/rule.svg'

import { Row as BaseRow, TouchableOpacity } from "@shared/ui";
import { View, Text } from "react-native";
import styled, { css } from "styled-components/native";
import * as Buttons from "../KeyboardButton";
import { color, font, size } from '@shared/config';
import type { FC } from 'react';
import { Copasetic } from '@shared/fonts/Copasetic';
import type { SvgProps } from 'react-native-svg';
import type { PropsWithBox } from '@shared/model';
import { StatsKeyboard } from '../StatsKeyboard';

export const Container: typeof View = styled(View)`
  
`

export const Row: typeof BaseRow = styled(BaseRow)`
  align-items: stretch;
  justify-content: center;
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
    width: 37,
    height: 37,
    fill: color.light10,
  })`
    position: relative;
    left: -2px;
  `

export const Placeholder: typeof View = styled(View)`
  flex: 1;
`

export const EqualsText: typeof Text = styled(Text)`
  color: ${color.light10};
  font-family: ${Copasetic.regular};
  font-size: ${font.size.lead}px;
`

type RuleProps = SvgProps & PropsWithBox

export const Rule: FC<RuleProps> = styled(RuleImage)
  .attrs({
    fill: 'white'
  })`
  ${({ box }: RuleProps) => css`
    width: ${Math.min(box.width, 250)}px;
    height: 40px;
    opacity: 0.8;
  `}
`