import styled, { css } from "styled-components/native";
import { Icon, type IconProps } from "../Icon/Icon";
import type { FC } from "react";
import { Text, View } from "react-native";
import { Row } from "@shared/ui/grid";
import type { CharProps, PropsWithSize } from "./IconNumber.types";
import { ArkhamDigits } from "@shared/fonts/ArkhamDigits";


export const Container: typeof View = styled(Row)`
  
`

export const CharContainer: typeof View = styled(View)`
  position: relative;
`


export const StrokeContainer: typeof View = styled(View)`
  position: relative;
`

export const Fill: typeof Text = styled(Text)`
  font-family: ${ArkhamDigits.fill};
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
`

export const Outline: typeof Text = styled(Text)`
  font-family: ${ArkhamDigits.outline};
  position: relative;
  z-index: 3;
`


export const UnstrokedText: typeof Text = styled(Text)`
  font-family: ${ArkhamDigits.fill};
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
