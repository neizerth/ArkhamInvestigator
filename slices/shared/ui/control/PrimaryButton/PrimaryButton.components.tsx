import { TouchableOpacity } from "@shared/ui/behavior/TouchableOpacity";
import * as ReactNative from "react-native";
import styled from "styled-components/native";
import { PrimaryButtonStyle, PropsWithStyleType } from "./PrimaryButton.types";
import { FC } from "react";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  height: 80px;
  justify-content: center;
  align-items: center;
`

const backgrounds: Record<PrimaryButtonStyle, ReactNative.ImageRequireSource> = {
  default: require('./images/default.png'),
  transparent: require('./images/transparent.png'),
  square: require('./images/square.png'),
}

const buttonWidth: Record<PrimaryButtonStyle, number> = {
  default: 250,
  transparent: 250,
  square: 180,
}

type BackgroundProps = ReactNative.ImageBackgroundProps & PropsWithStyleType;

export const Background: FC<BackgroundProps> = styled(ReactNative.ImageBackground)
  .attrs(
    ({ styleType = 'default' }: BackgroundProps) => 
    ({
      source: backgrounds[styleType],
      resizeMode: 'contain',
      resizeMethod: 'resize'
    })
  )`
    width: ${({ styleType = 'default' }: BackgroundProps) => buttonWidth[styleType]}px;
    height: 80px;
    flex: 1;
    justify-content: center;
    align-items: center;
  `
