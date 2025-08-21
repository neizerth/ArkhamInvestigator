import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import styled from "styled-components/native";

import Animated from "react-native-reanimated";
import { InvestigatorImageMemo as Image } from "../../InvestigatorImage";

export const Background: typeof Image = styled(Image).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`
`;

export const NextBackground: typeof Background = styled(Background)`

`;

export const Container: FC<ViewProps> = styled(View)`
  overflow: hidden;
	position: absolute;
	left: 0;
	top: 0;
`;

export const BackgroundContainer: FC<ViewProps> = styled(Animated.View)`
	flex: 1;
	position: absolute;
	left: 0;
	top: 0;
`;
