import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { Icon, type IconProps } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

type SwitchIconProps = IconProps & {
	active?: boolean;
};

export const SwitchIcon: FC<SwitchIconProps> = styled(Icon)`
  position: relative;
  z-index: 2;
  color: #FB4135;
  font-size: 40px;
  line-height: 40px;
  ${({ active }: SwitchIconProps) =>
		!active &&
		css`
    opacity: 0.4;
    color: ${color.light10};
  `}
`;

export const EffectIcon: typeof Icon = styled(Icon)`
  position: absolute;
  z-index: 1;
  color: ${color.light10};
  font-size: 30px;
  line-height: 40px;
`;
