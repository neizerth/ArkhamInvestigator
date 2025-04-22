"use client";

import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { FullHeightView } from "../FullHeightView";

export const Container: typeof ScrollView = styled(ScrollView).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`
  flex: 1
`;

export const Content: typeof FullHeightView = styled(FullHeightView)`
  
`;
