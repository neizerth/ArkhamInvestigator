import styled, { css } from "styled-components/native";
import { Icon, type IconProps } from "../Icon/Icon";
import type { FC } from "react";
import { View } from "react-native";
import { Row } from "@shared/ui/grid";
import type { CharProps, PropsWithSize } from "./IconNumber.types";


export const Container: typeof Row = styled(Row)`
  align-items: center;
`

type Value = {

}
export const CharContainer: typeof View = styled(View)`
  position: relative;
`

export const Outline: typeof View = styled(View)`
  position: relative;
  z-index: 1;
`

export const CharNumber: typeof View = styled(View)`
  position: absolute;
  flex: 1;
  z-index: 2;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
`

export const Char: FC<CharProps> = styled(Icon)
  .attrs({
    scaleType: false
  })`
  ${({ size }: PropsWithSize) => css`
    letter-spacing: ${size * 0.1}px;
  `}
`

export const Sign: typeof Char = styled(Char)`
  ${({ size }: PropsWithSize) => css`
    font-size: ${size * 0.4}px;
  `}
`
