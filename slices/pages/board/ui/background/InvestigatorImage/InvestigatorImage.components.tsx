import type { HeaderLayout } from "@pages/board/model";
import type { Box } from "@shared/model";
import type { FC } from "react";
import { View, Image, type ImageProps, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { PortraitImage } from "../PortraitImage";
import { LandscapeImage, LandscapeImageProps } from "../LandscapeImage";
import { SERVICE_PADDING } from "@pages/board/config";

export const Container: typeof View = styled(View)`
`

export const Content: typeof View = styled(View)`
  position: relative;
  flex: 1;
`

export const FactionBackground: typeof Image = styled(Image)`
  flex: 1;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  ${({ width = 0, height = 0}: ImageProps) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`

export const PortraitBackground: typeof PortraitImage = styled(PortraitImage)`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
` 

type LandscapeBackgroundProps = LandscapeImageProps & {
  layout: HeaderLayout
}

export const LandscapeBackground: FC<LandscapeBackgroundProps> = styled(LandscapeImage)`
  position: absolute;
  z-index: 2;
  ${({ layout }: LandscapeBackgroundProps) => css`
    top: ${layout.height + layout.gap}px;
    left: ${SERVICE_PADDING}px;
  `}
`