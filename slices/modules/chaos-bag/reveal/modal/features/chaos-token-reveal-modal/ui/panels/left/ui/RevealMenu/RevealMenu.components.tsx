import {
	TouchableOpacity,
	type TouchableOpacityProps,
} from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { Icon, Text } from "@shared/ui";
import type { IconProps } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import { css } from "styled-components";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
  height: 40px;
`;

type ToggleProps = TouchableOpacityProps & {
	open?: boolean;
};

export const Toggle: FC<ToggleProps> = styled(TouchableOpacity)`
  position: absolute;
  z-index: 10;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid ${color.dark10};
  ${({ open }: ToggleProps) =>
		open &&
		css`
      border: 1px solid ${color.gray30};
    `}
`;

type ToggleIconProps = IconProps & {
	open?: boolean;
};

export const ToggleIcon: FC<ToggleIconProps> = styled(Icon)`
  font-size: 14px;
  color: ${color.gray20};
  ${({ open }: ToggleIconProps) =>
		open &&
		css`
      color: ${color.dark20};
      transform: rotate(45deg);
    `}
`;

export const MenuIcon: typeof Icon = styled(Icon)`
  color: ${color.text};
  font-size: 14px;
  width: 18px;
  text-align: center;
`;

export const MenuLabel: typeof Text = styled(Text).attrs({
	numberOfLines: 1,
})`
  color: ${color.text};
`;

export const Menu: typeof View = styled(View)`
  z-index: 1;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 270px;
  background-color: ${color.light10};
  border-radius: 20px;
  border: 1px solid ${color.dark10};
`;

type MenuItemProps = TouchableOpacityProps & {
	first?: boolean;
	last?: boolean;
};

export const MenuItem: FC<MenuItemProps> = styled(TouchableOpacity)`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  ${({ last }: MenuItemProps) =>
		!last &&
		css`
    border-bottom-width: 1px;
    border-bottom-color: ${color.gray10};
  `}

  ${({ first }: MenuItemProps) =>
		first &&
		css`
    padding-bottom: 15px;
    padding-left: 50px;
  `}
`;
