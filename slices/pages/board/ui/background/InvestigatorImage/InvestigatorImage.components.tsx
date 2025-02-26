import type { BackgroundLayout, HeaderLayout } from "@pages/board/model";
import type { BoxLayout, PropsWithBox, PropsWithFaction, ScaledBoxLayout } from "@shared/model/ui";
import type { FC } from "react";
import { View, Image, type ImageProps, ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
`

export const Content: typeof View = styled(View)`
  position: relative;
  flex: 1;
`



export const FactionBackground: typeof Image = styled(Image)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

type BackgroundProps = ImageProps & {
  layout: BoxLayout
}

export const Background: FC<BackgroundProps> = styled(Image)`
  position: absolute;
  ${({ layout }: BackgroundProps) => css`
    left: ${-layout.left}px;
    top: ${-layout.top}px;
    width: ${layout.width}px;
    height: ${layout.height}px;
 `}
`

type BackgroundContainerProps = ViewProps & {
  layout: HeaderLayout
}

export const BackgroundContainer: FC<BackgroundContainerProps> = styled(View)`
  position: absolute;
  overflow: hidden;
  ${({ layout }: BackgroundContainerProps) => css`
    top: ${layout.height}px;
    bottom: 0px;
    left: 0px;
    right: 0px;
 `}
`