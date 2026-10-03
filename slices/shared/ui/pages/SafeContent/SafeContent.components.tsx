import { View } from "react-native";

import styled from "styled-components/native";
import { ScrollView } from "../../behavior";

export const FullContent: typeof View = styled(View)`
  flex: 1;
`;

export const Content: typeof ScrollView = styled(ScrollView)`
  flex: 1;
  padding: ${({ theme: { size, navbarHeight, safeAreaInsets } }) =>
		`0px ${size.gap.medium + safeAreaInsets.right}px ${navbarHeight}px ${size.gap.medium + safeAreaInsets.left}px`};
  margin-bottom: ${({ theme }) => theme.size.gap.default}px;
`;
