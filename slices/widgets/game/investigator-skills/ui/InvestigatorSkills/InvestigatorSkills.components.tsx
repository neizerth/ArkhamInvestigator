import { Row } from "@shared/ui";
import type { FC } from "react";
import type { ImageProps } from "react-native";
import { Image, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Background: FC<ImageProps> = styled(Image)`
  ${({ width, height }: ImageProps) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;

export const Content: typeof Row = styled(Row)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
