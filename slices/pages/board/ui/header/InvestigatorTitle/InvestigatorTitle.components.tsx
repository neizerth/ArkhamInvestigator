import type { FC } from "react";
import type { ImageProps } from "react-native";
import { Image } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: FC<ImageProps> = styled(Image)`
  ${({ width, height }: ImageProps) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`
