import { 
  Image as NativeImage,
  TouchableOpacity,
  View 
} from "react-native";
import type { ImageProps, ViewProps } from 'react-native'
import styled, { css } from "styled-components/native";
import type { Faction } from "@shared/model";
import type { FC } from "react";

import { color, factionColor } from "@shared/config";
import Color from "color";
import type { PropsWithFaction } from "@shared/model/ui";
import { Icon } from "@shared/ui";


const getSelectionColor = (faction: Faction) => {
  const color = factionColor[faction].darkColor;

  return Color(color).alpha(0.3).string()
}

export const Selection: FC<ViewProps & PropsWithFaction> = styled(View)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${({ faction }: PropsWithFaction) => css`
    border: 5px solid ${factionColor[faction].border};
    background-color: ${getSelectionColor(faction)};
  `}
`

type SizeProps = {
  size: number
}

export const Image: FC<ImageProps & SizeProps> = styled(NativeImage)
  .attrs({
    resizeMode: 'cover',
    resizeMethod: 'resize'
  })`
    ${({ size }: SizeProps) => css`
      aspect-ratio: 1;
      width: ${size}px;
    `}
  ` 


export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
  overflow: hidden;
`

export const Info: typeof View = styled(View)`
  position: absolute;
  flex-direction: row;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 0 10px 0 0;
  padding: 2px 8px;
  padding-top: 2px;
`

export const ExtraIcon: typeof Icon = styled(Icon)`
  font-size: 22px;
  text-align: center;
  color: ${color.white}
`



export const OptionsInfo: FC<ViewProps & PropsWithFaction> = styled(View)`
  position: absolute;
  z-index: 1;
  right: -15px;
  top: -15px;
  width: 30px;
  aspect-ratio: 1;
  ${({ faction }: PropsWithFaction) => css`
    background: ${factionColor[faction].border};
  `}
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  transform: rotate(45deg);
`