import {
	ThemeFactionFontIcon,
	type ThemeFactionFontIconProps,
} from "@modules/core/theme/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, factionColor } from "@shared/config";
import type { PropsWithFaction } from "@shared/model";
import { Icon as BaseIcon, type IconProps as BaseIconProps } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import type { FactionSelectButtonProps } from "./FactionSelectButton";

type ButtonProps = FactionSelectButtonProps;

export const Button: FC<ButtonProps> = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  ${({ selected, value }: ButtonProps) =>
		selected &&
		css`
    background-color: ${value === "spoiler" ? color.status.error.light10 : color.dark20};
  `}
  ${({ first, selected }: ButtonProps) =>
		selected &&
		first &&
		css`
    border-radius: 48px 0 0 48px;
  `}
  ${({ last, selected }: ButtonProps) =>
		selected &&
		last &&
		css`
    border-radius: 0 48px 48px 0;
  `}
`;

type SelectedProps = {
	selected?: boolean;
};

type FactionIconProps = ThemeFactionFontIconProps &
	PropsWithFaction &
	SelectedProps;

export const FactionIcon: FC<FactionIconProps> = styled(ThemeFactionFontIcon)`
  color: ${color.light10};
  font-size: 25px;
  line-height: 46px;
  ${({ faction, selected }: FactionIconProps) =>
		selected &&
		css`
    color: ${factionColor[faction].darkColor};
  `}
`;

type IconProps = BaseIconProps & SelectedProps;

export const Icon: FC<IconProps> = styled(BaseIcon)`
  color: ${color.light10};
  font-size: 25px;
  line-height: 25px;
`;
