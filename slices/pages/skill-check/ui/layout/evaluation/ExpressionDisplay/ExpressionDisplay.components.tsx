import { color } from "@shared/config";
import { Copasetic } from "@shared/fonts/Copasetic";
import { Icon, IconProps } from "@shared/ui";
import { Text, TextProps, View } from "react-native";
import styled, { css } from "styled-components/native";
import { PropsWithType } from "./ExpressionDisplay.types";
import { FC } from "react";
import { statFontSize, typeFontSize } from "./ExpressionDisplay.styles";

export const Container: typeof View = styled(View)`
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

type StatProps = IconProps & PropsWithType;
export const Stat: FC<StatProps> = styled(Icon)`
  ${({ type = 'secondary'}: StatProps) => css`
    font-size: ${statFontSize[type]}px;
  `}
`