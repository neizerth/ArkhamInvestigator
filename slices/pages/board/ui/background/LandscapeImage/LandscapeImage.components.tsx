import { size } from "@shared/config";
import { Image, ImageProps } from "react-native";
import styled, { css } from "styled-components/native";

export const Background: typeof Image = styled(Image)`
  border-radius: ${size.borderRadius.default}px;
  ${({ width, height }: ImageProps) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`