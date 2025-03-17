import { color } from "@shared/config";
import { Copasetic } from "@shared/fonts"
import { AppText, Icon, type IconProps, TouchableOpacity } from "@shared/ui";
import { Text, type TextProps, View } from "react-native";
import styled, { css } from "styled-components/native";
import type { PropsWithType } from "./ExpressionDisplay.types";
import type { FC } from "react";
import { statFontSize, typeFontSize } from "./ExpressionDisplay.styles";
import { Pressable } from "react-native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`

`

type ExpressionProps = TextProps & PropsWithType;

const typeStyle = {
  primary: css`
    font-size: ${typeFontSize.primary}px;
    color: ${color.light10};
  `,
  secondary: css`
    font-size: ${typeFontSize.secondary}px;
    color: ${color.dark10};
  `
} 

export const Expression: FC<ExpressionProps> = styled(AppText)`
  font-family: ${Copasetic.regular};
  text-align: right;
  letter-spacing: 2px;
  ${({ type = 'secondary'}: ExpressionProps) => typeStyle[type]}
`

export const OldValue: typeof AppText = styled(AppText)`
  color: ${color.dark20};
`

export const Value: typeof AppText = styled(AppText)`
`

export const Greater: typeof AppText = styled(AppText)`
  color: #198754;
`

export const Lower: typeof AppText = styled(AppText)`
  color: #dc3545;
`


type StatProps = IconProps & PropsWithType;

export const Stat: FC<StatProps> = styled(Icon)`
  ${({ type = 'secondary'}: StatProps) => css`
    font-size: ${statFontSize[type]}px;
  `}
`