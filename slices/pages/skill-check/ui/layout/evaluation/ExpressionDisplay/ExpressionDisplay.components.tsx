import { color } from "@shared/config";
import { Copasetic } from "@shared/fonts";
import {
	Icon,
	type IconProps,
	TouchableOpacity,
	UnscaledText,
} from "@shared/ui";
import type { FC } from "react";
import { Text, type TextProps, View } from "react-native";
import { Pressable } from "react-native";
import styled, { css } from "styled-components/native";
import { statFontSize, typeFontSize } from "./ExpressionDisplay.styles";
import type { PropsWithType } from "./ExpressionDisplay.types";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`

`;

type ExpressionProps = TextProps & PropsWithType;

const typeStyle = {
	primary: css`
    font-size: ${typeFontSize.primary}px;
    color: ${color.light10};
  `,
	secondary: css`
    font-size: ${typeFontSize.secondary}px;
    color: ${color.dark10};
  `,
};

export const Expression: FC<ExpressionProps> = styled(UnscaledText)`
  font-family: ${Copasetic.regular};
  text-align: right;
  letter-spacing: 2px;
  ${({ type = "secondary" }: ExpressionProps) => typeStyle[type]}
`;

export const OldValue: typeof UnscaledText = styled(UnscaledText)`
  color: ${color.dark20};
`;

export const Value: typeof UnscaledText = styled(UnscaledText)`
`;

export const Greater: typeof UnscaledText = styled(UnscaledText)`
  color: #198754;
`;

export const Lower: typeof UnscaledText = styled(UnscaledText)`
  color: #dc3545;
`;

type StatProps = IconProps & PropsWithType;

export const Stat: FC<StatProps> = styled(Icon)`
  ${({ type = "secondary" }: StatProps) => css`
    font-size: ${statFontSize[type]}px;
  `}
`;
