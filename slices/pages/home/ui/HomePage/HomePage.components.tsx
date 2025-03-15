import { color, size } from '@shared/config';
import { DefinedIconProps, Icon, TouchableOpacity } from '@shared/ui';
import { FC } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Button } from '../Button';
import { Alegreya } from '@shared/fonts';

export const Container: typeof View = styled(View)`
  background-color: ${color.black};
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const ResumeButton: typeof Button = styled(Button)
  .attrs({
    size: 'small',
    styleType: 'transparent'
  })`
    
  `

export const SpecialButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  z-index: 1;
  top: 40px;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`

export const SettingsButton: typeof SpecialButton = styled(SpecialButton)`
  right: ${size.gap.default}px;
`

export const AboutButton: typeof SpecialButton = styled(SpecialButton)`
  left: ${size.gap.default}px;
`

export const ButtonIcon: typeof Icon = styled(Icon)`
  color: ${color.light10};
`

export const SettingsIcon: FC<DefinedIconProps> = styled(ButtonIcon)
  .attrs({
    icon: 'wrench'
  })`
    font-size: 30px;
  `


export const AboutIcon: FC<DefinedIconProps> = styled(ButtonIcon)
  .attrs({
    icon: 'info'
  })`
    font-size: 24px;
  `

export const Disclaimer: typeof View = styled(View)`
  position: absolute;
  bottom: ${size.gap.large};
  left: ${size.gap.large};
  right: ${size.gap.large};
`

export const DisclaimerText: typeof Text = styled(Text)`
  color: ${color.dark10};
  font-family: ${Alegreya.regular};
`