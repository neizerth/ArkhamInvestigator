import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { ChaosTokenPreview } from "@modules/chaos-bag/base/shared/ui";
import { Text } from "@shared/ui";
import type { FC } from "react";
import { Platform, type TextProps, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

type PropsWithSelection = {
	selected?: boolean;
};

export const Container: typeof View = styled(View)`
  
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;

type PositionProps = ViewProps & PropsWithSelection;

const ios = Platform.OS === "ios";

export const Position: FC<PositionProps> = styled(View)`
  position: absolute;
  z-index: 1;
  top: -2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.light10};
  justify-content: center;
  align-items: center;
  padding: ${ios ? 1 : 0}px;

  ${({ selected }: PositionProps) =>
		selected &&
		css`
    background-color: ${chaosToken.color.selected};
  `}
`;

type PositionTextProps = TextProps & {
	size: number;
};

export const PositionText = styled(Text)<PositionTextProps>`
  ${({ size, theme }) => css`
    font-size: ${size === 1 ? theme.font.size.small : theme.font.size.xs * 0.9}px;
    line-height: ${size === 1 ? theme.font.size.small : theme.font.size.xs * 1.05}px;
  `}
  ${
		!ios &&
		css`
    position: absolute;
    top: -1px;
  `
	}
  color: ${({ theme }) => theme.color.text};
`;
