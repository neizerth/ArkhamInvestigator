import {
	RadialProgressMemo as RadialProgress,
	type RadialProgressProps,
} from "@shared/ui";
import type { FC } from "react";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof Animated.View = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

type ProgressProps = RadialProgressProps & {
	size: number;
};

export const Progress: FC<ProgressProps> = styled(RadialProgress)`
  border-radius: ${({ size }: ProgressProps) => size}px;
  background: rgba(0, 0, 0, 0.1);
`;
