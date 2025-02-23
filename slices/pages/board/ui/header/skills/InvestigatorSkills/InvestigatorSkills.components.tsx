import type { FC } from "react";
import type { ImageProps } from "react-native";
import { Image, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
`

export const Background: FC<ImageProps> = styled(Image)`
  ${({ width, height }: ImageProps) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`
