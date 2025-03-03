import styled, { css } from "styled-components/native";
import { Icon, type IconProps } from "../Icon/Icon";
import type { FC } from "react";
import { View } from "react-native";
import { Row } from "@shared/ui/grid";
import type { CharProps, PropsWithSize } from "./IconNumber.types";


export const Container: typeof View = styled(Row)`
  position: relative;
`

export const CharContainer: typeof View = styled(View)`
  
`

export const Outline: typeof View = styled(View)`
  position: relative;
  z-index: 3;
`

export const CharFill: typeof View = styled(View)`
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
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
  vertical-align: middle;
  ${({ size }: PropsWithSize) => css`
    font-size: ${size * 0.4}px;
  `}
`
