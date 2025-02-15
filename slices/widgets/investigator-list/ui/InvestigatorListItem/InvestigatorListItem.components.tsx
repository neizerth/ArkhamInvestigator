import { Icon } from "@shared/ui";
import { IMAGE_SIZE } from "@widgets/investigator-list/config";
import { FactionIcon as BaseFactionIcon } from "@shared/ui";
import { 
  Image as NativeImage,
  TouchableOpacity,
  View 
} from "react-native";
import type { ViewProps } from 'react-native'
import styled, { css } from "styled-components/native";
import type { Faction } from "@shared/model";
import type { FC } from "react";

import { factionColor } from "@shared/config";

type SelectionElement = FC<ViewProps & FactionProps>;

type FactionProps = {
  faction: Faction
}

export const Selection: SelectionElement = styled(View)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${({ faction }: FactionProps) => css`
    border: 5px solid ${factionColor[faction].darkBackground}
  `}
`

export const Image: typeof NativeImage = styled(NativeImage)
  .attrs({
    resizeMode: 'cover',
    resizeMethod: 'resize'
  })`
    width: ${IMAGE_SIZE}px;
    height: ${IMAGE_SIZE}px;
  ` 

export const FactionIcon: typeof BaseFactionIcon = styled(BaseFactionIcon)`
  width: 30px;
  height: 30px;
`

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
  height: ${IMAGE_SIZE}px;
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
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 10px 0 0;
  padding: 2px 8px;
  padding-top: 2px;
`


export const NeutralIcon = styled(Icon)
  .attrs({
    icon: 'neutral'
  })`
  font-size: 24px;
  flex-shrink: 0;
  color: white;
`