import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export const Loader = styled(ActivityIndicator).attrs(({ theme }) => ({
	color: theme.color.dark10,
}))`
	padding: ${({ theme }) => theme.size.gap.default}px 0;
  flex: 1;
`;
