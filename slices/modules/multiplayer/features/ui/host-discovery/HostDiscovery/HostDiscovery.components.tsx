import { Button, Row } from "@shared/ui";
import { ActivityIndicator, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  
`;

export const Services: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Service: typeof Button = styled(Button)`
  background-color: ${({ theme }) => theme.color.dark20};
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	({ theme }) => ({
		color: theme.color.dark10,
	}),
)`
`;

export const Loading: typeof Row = styled(Row)`
  ${({ theme: { size } }) => css`
  gap: ${size.gap.default}px;
  align-items: center;
  justify-content: center;
  padding: ${size.gap.large}px 0px ${size.gap.default}px 0;
`}`;
