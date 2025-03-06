import BackspaceImage from './images/backspace.svg';
import RuleImage from './images/rule.svg'

import { Row as BaseRow, TouchableOpacity } from "@shared/ui";
import { View, ScrollView, Text } from "react-native";
import styled, { css } from "styled-components/native";
import { KeyboardButton } from "../KeyboardButton";
import { color, font, size } from '@shared/config';
import { KeyboardButtonProps } from '../KeyboardButton/KeyboardButton.types';
import { FC } from 'react';
import { Copasetic } from '@shared/fonts/Copasetic';
import { SvgProps } from 'react-native-svg';
import { PropsWithBox } from '@shared/model';

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

export const Button: typeof KeyboardButton = styled(KeyboardButton)`
  flex: 1;
`

export const Stats: typeof ScrollView = styled(ScrollView)`
  flex: 2;
`

export const StatsRow: typeof Row = styled(Row)`
  justify-content: center;
  align-items: center;
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

type StatProps = Omit<KeyboardButtonProps, 'size' | 'type'> & {
  icon: string
}

export const Stat: FC<StatProps> = styled(KeyboardButton)
  .attrs({
    size: 'small',
    type: 'icon'
  })`
  `

export const StatRule: typeof View = styled(View)`
  flex: 1;
  width: 1px;
  height: 20px;
  background-color: ${color.dark20};
  margin: 0 ${size.gap.small}px;
`

export const EqualsText: typeof Text = styled(Text)`
  color: ${color.light10};
  font-family: ${Copasetic.regular};
  font-size: ${font.size.lead};
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