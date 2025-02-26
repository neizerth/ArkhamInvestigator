import type { BackgroundLayout } from "@pages/board/model";
import type { PropsWithBox, PropsWithFaction, ScaledBoxLayout } from "@shared/model/ui";
import type { FC } from "react";
import { View, Image, type ImageProps } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
` 

export const Content: typeof View = styled(View)`
  position: relative;
  flex: 1;
`

type BackgroundProps = ImageProps & {
  layout: ScaledBoxLayout
}

export const FactionBackground: FC<ImageProps & PropsWithFaction> = styled(Image)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

export const Background: FC<BackgroundProps> = styled(Image)`
  position: absolute;
  ${({ layout }: BackgroundProps) => css`
    left: ${-layout.left}px;
    top: ${-layout.top}px;
    width: ${layout.width}px;
    height: ${layout.height}px;
 `}
`