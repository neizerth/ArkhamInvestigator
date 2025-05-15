import { color, font } from "@shared/config";
import { Text } from "@shared/ui";
import type { FC } from "react";
import { type TextProps, View } from "react-native";
import styled, { css } from "styled-components/native";
import { ChaosTokenPreview } from "../../token";

export const Container: typeof View = styled(View)`
  
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;

export const Position: typeof View = styled(View)`
  position: absolute;
  z-index: 1;
  top: -2px;
  right: 7px;
  width: 15px;
  height: 15px;
  border-radius: 25px;
  border: 1px solid ${color.light10}; 
  background-color: ${color.light10};
  justify-content: center;
  align-items: center;
`;

const positionFontSize: Record<number, number> = {
	1: font.size.small,
	2: font.size.xs * 0.9,
};

const positionLineHeight: Record<number, number> = {
	1: font.size.small,
	2: font.size.xs * 1.05,
};

type PositionTextProps = TextProps & {
	size: number;
};

export const PositionText: FC<PositionTextProps> = styled(Text)`
  ${({ size }: PositionTextProps) => css`
    font-size: ${positionFontSize[size]}px;
    line-height: ${positionLineHeight[size]}px;
  `}
  
  color: ${color.text};
`;
