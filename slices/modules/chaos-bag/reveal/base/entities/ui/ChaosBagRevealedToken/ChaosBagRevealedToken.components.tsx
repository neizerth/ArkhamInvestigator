import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { ChaosTokenPreview } from "@modules/chaos-bag/base/shared/ui";
import { color, font } from "@shared/config";
import { Text } from "@shared/ui";
import type { FC } from "react";
import { type TextProps, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

type PropsWithSelection = {
	selected?: boolean;
};

export const Container: typeof View = styled(View)`
  
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;

type PositionProps = ViewProps & PropsWithSelection;

export const Position: FC<PositionProps> = styled(View)`
  position: absolute;
  z-index: 1;
  top: -2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: ${color.light10};
  justify-content: center;
  align-items: center;

  ${({ selected }: PositionProps) =>
		selected &&
		css`
    background-color: ${chaosToken.color.selected};
  `}
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
  position: absolute;
  top: -1px;
  color: ${color.text};
`;
