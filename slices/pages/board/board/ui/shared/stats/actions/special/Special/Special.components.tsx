import {
	TouchableOpacity,
	type TouchableOpacityProps,
} from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { Icon as BaseIcon } from "@shared/ui";
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
  font-size: 30px;
  line-height: 30px;
  color: ${color.white};
  text-shadow: 0 0 5px ${color.black};
  width: 32px;
`;

export const Used: typeof BaseIcon = styled(BaseIcon)`
  font-size: 35px;
  line-height: 35px;
  color: ${color.health};
  position: absolute;
`;
