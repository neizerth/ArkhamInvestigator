import { View } from "react-native";

import styled from "styled-components/native";
import { ScrollView } from "../../behavior";

export const FullContent: typeof View = styled(View)`
  flex: 1;
`;

export const Content: typeof ScrollView = styled(ScrollView).attrs(
	({ theme: { size, navbarHeight, safeAreaInsets } }) => ({
		contentContainerStyle: {
			paddingTop: 0,
			paddingRight: size.gap.medium + safeAreaInsets.right,
			paddingBottom: navbarHeight,
			paddingLeft: size.gap.medium + safeAreaInsets.left,
		},
	}),
)`
  flex: 1;
  margin-bottom: ${({ theme }) => theme.size.gap.default}px;
`;
