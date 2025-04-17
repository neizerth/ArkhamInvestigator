import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import styled from "styled-components/native";

import { InvestigatorImage } from "../InvestigatorImage";

export const Background: typeof InvestigatorImage = styled(
	InvestigatorImage,
).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`

`;

export const Container: FC<ViewProps> = styled(View)`
  overflow: hidden;
`;
