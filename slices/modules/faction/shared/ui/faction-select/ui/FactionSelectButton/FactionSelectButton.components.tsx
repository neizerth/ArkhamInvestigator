import {
	ThemeFactionFontIcon,
	type ThemeFactionFontIconProps,
} from "@modules/core/theme/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { factionColor } from "@shared/config";
import type { PropsWithFaction } from "@shared/model";
import { Icon as BaseIcon, type IconProps as BaseIconProps } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import type { FactionSelectButtonProps } from "./FactionSelectButton";

type ButtonProps = FactionSelectButtonProps & {
	size: number;
	vertical: boolean;
};

const iconSize = (size: number) => 2 + size / 2;

export const Button: FC<ButtonProps> = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  ${({ selected, value }: ButtonProps) =>
		selected &&
		css`
  ${({ theme: { color } }) => css`
    background-color: ${value === "spoiler" ? color.status.error.light10 : color.dark20};
  `}`}
  ${({ first, selected, vertical, size }: ButtonProps) =>
		selected &&
		first &&
		css`
    border-radius: ${vertical ? `${size}px ${size}px 0 0` : `${size}px 0 0 ${size}px`};
  `}
  ${({ last, selected, vertical, size }: ButtonProps) =>
		selected &&
		last &&
		css`
    border-radius: ${vertical ? `0 0 ${size}px ${size}px` : `0 ${size}px ${size}px 0`};
  `}
`;

type SelectedProps = {
	selected?: boolean;
};

type FactionIconProps = ThemeFactionFontIconProps &
	PropsWithFaction &
	SelectedProps & {
		size: number;
	};

export const FactionIcon: FC<FactionIconProps> = styled(ThemeFactionFontIcon)`
  ${({ size, theme }) => css`
    color: ${theme.color.light10};
    line-height: ${size}px;
    font-size: ${iconSize(size)}px;
  `}
  ${({ faction, selected }: FactionIconProps) =>
		selected &&
		css`
    color: ${factionColor[faction].darkColor};
  `}
`;

type IconProps = BaseIconProps &
	SelectedProps & {
		size: number;
	};

export const Icon: FC<IconProps> = styled(BaseIcon)`
  ${({ size, theme }) => css`
    color: ${theme.color.light10};
    font-size: ${iconSize(size)}px;
    line-height: ${iconSize(size)}px;
  `}
`;
