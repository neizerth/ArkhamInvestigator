import type { FC } from "react";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import {
	ChaosTokenRevealProgress,
	type ChaosTokenRevealProgressProps,
} from "../ChaosTokenRevealProgress";

export const Container: typeof Animated.View = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

type ProgressProps = ChaosTokenRevealProgressProps & {
	size: number;
};

export const Progress: FC<ProgressProps> = styled(ChaosTokenRevealProgress)`
  border-radius: ${({ size }: ProgressProps) => size}px;
  background: rgba(0, 0, 0, 0.1);
`;
