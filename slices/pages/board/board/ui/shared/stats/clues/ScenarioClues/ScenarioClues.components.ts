import { IconButton, type IconButtonProps } from "@modules/haptic/shared/ui";
import { color } from "@shared/config";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Clues } from "../Clues";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Control: typeof Clues = styled(Clues)`

`;

type LockProps = IconButtonProps & {
	enabled?: boolean;
};

export const Lock: FC<LockProps> = styled(IconButton).attrs(
	({ enabled }: LockProps) => ({
		iconStyle: {
			color: enabled ? "rgb(86, 122, 45)" : color.dark10,
			fontSize: 24,
		},
	}),
)`
	color:rgb(86, 122, 45);
  position: absolute;
  z-index: 2;
  right: -35px;
  top: -52px;
	width: 50px;
	align-items: flex-start;
`;
