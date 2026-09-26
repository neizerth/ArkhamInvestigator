import {
	TouchableOpacity,
	type TouchableOpacityProps,
} from "@modules/core/touch/shared/ui";
import { Icon as BaseIcon, type DefinedIconProps } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";

type ContainerProps = TouchableOpacityProps & {
	enabled?: boolean;
};

export const Container: FC<ContainerProps> = styled(TouchableOpacity)`
  height: 38px;
  width: 38px;
  justify-content: center;
  align-items: center;
  ${({ enabled = true }: ContainerProps) =>
		!enabled &&
		css`
    opacity: 0.6;
  `}
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  ${({ theme: { color } }) => css`
  font-size: 30px;
  line-height: 30px;
  color: ${color.white};
  text-shadow: 0 0 5px ${color.black};
  width: 32px;
`}`;

export const Cross: FC<DefinedIconProps> = styled(BaseIcon).attrs({
	icon: "cross_c",
})`
  font-size: 35px;
  line-height: 35px;
  color: ${({ theme }) => theme.color.health};
  position: absolute;
`;

export const checkStyle = css`
  font-size: 48px;
  line-height: 48px;
  left: -5px;
  position: absolute;
`;

export const CheckOutline: FC<DefinedIconProps> = styled(BaseIcon).attrs({
	icon: "check-outline",
})`
  ${checkStyle}
  color: ${({ theme }) => theme.color.white};
`;

export const CheckFill: FC<DefinedIconProps> = styled(BaseIcon).attrs({
	icon: "check-fill",
})`
  ${checkStyle}
  color: ${({ theme }) => theme.color.evade};
`;
