import type { BackgroundLayout } from "@pages/board/model";
import type { PropsWithBox } from "@shared/model/ui";
import type { FC } from "react";
import { View, Image, type ImageProps } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
` 

type BackgroundProps = ImageProps & {
  layout: BackgroundLayout
}

export const Background: FC<BackgroundProps> = styled(Image)`
  position: absolute;
  ${({ layout }: BackgroundProps) => css`
    left: -${layout.left}px;
    width: ${layout.image.width}px;
    height: ${layout.image.height}px;
 `}
`