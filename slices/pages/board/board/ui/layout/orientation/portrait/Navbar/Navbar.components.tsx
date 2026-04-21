import type { FC } from "react";
import type { ViewProps } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

type ContainerProps = ViewProps & {
	navbarHeight: number;
};

export const Container: FC<ContainerProps> = styled(Animated.View)`
  position: absolute;
	z-index: 5;
	bottom: 0;
	height: ${({ navbarHeight }: ContainerProps) => navbarHeight}px;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.7);
`;
