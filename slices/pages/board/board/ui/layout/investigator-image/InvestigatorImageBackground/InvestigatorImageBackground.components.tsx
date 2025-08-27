import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import styled from "styled-components/native";

import { SignatureBackground } from "@modules/signature/entities/ui";
import Animated from "react-native-reanimated";

export const Background: typeof SignatureBackground = styled(
	SignatureBackground,
).attrs({})`
`;

export const NextBackground: typeof Background = styled(Background)`

`;

export const Container: FC<ViewProps> = styled(View)`
  overflow: hidden;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
`;

export const BackgroundContainer: FC<ViewProps> = styled(Animated.View)`
	flex: 1;
	position: absolute;
	left: 0;
	top: 0;
`;
