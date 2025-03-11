import { color } from "@shared/config";
import { Copasetic } from "@shared/fonts/Copasetic";
import { Icon, IconProps, TouchableOpacity } from "@shared/ui";
import { Text, TextProps, View } from "react-native";
import styled, { css } from "styled-components/native";
import { PropsWithType } from "./ExpressionDisplay.types";
import { FC } from "react";
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

export const Expression: FC<ExpressionProps> = styled(Text)`
  font-family: ${Copasetic.regular};
  text-align: right;
  letter-spacing: 2px;
  ${({ type = 'secondary'}: ExpressionProps) => typeStyle[type]}
`

export const OldValue: typeof Text = styled(Text)`
  color: ${color.dark20};
`

export const Value: typeof Text = styled(Text)`
`

export const Greater: typeof Text = styled(Text)`
  color: #198754;
`

export const Lower: typeof Text = styled(Text)`
  color: #dc3545;
`


type StatProps = IconProps & PropsWithType;

export const Stat: FC<StatProps> = styled(Icon)`
  ${({ type = 'secondary'}: StatProps) => css`
    font-size: ${statFontSize[type]}px;
  `}
`