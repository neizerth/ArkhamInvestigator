import { color } from "@shared/config";
import {
	Icon as BaseIcon,
	type DefinedIconProps,
	Row,
	TouchableOpacity,
} from "@shared/ui";
import type { FC } from "react";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
`;

export const Left: typeof Row = styled(Row)`

`;

export const Right: typeof Row = styled(Row)`

`;

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 30px;
  color: ${color.light10};
`;

export const InfoIcon: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "info",
})`
    font-size: 26px;
  `;

export const SupportIcon: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "heart",
})`
    font-size: 26px;
  `;
