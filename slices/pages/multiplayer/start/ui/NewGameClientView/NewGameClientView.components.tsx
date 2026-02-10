import { color, size } from "@shared/config";
import { Button, type ButtonProps, Input, Row, Text } from "@shared/ui";
import { ActivityIndicator, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  gap: ${size.gap.default}px;
  padding: ${size.gap.default}px;
`;

export const Hint: typeof Text = styled(Text)`

`;

export const CodeInput: typeof Input = styled(Input).attrs({
	autoCapitalize: "none",
})`
  
`;

export const Action: typeof Button = styled(Button)`
  background-color: ${color.dark20};
  border: 2px solid ${color.dark20};
  ${({ disabled }: ButtonProps) =>
		disabled &&
		css`
    background-color: transparent;
  `}
`;

export const Services: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const SearchIndicator: typeof ActivityIndicator = styled(
	ActivityIndicator,
).attrs({
	color: color.dark10,
})`
`;

export const Search: typeof Row = styled(Row)`
  gap: ${size.gap.default}px;
  align-items: center;
  justify-content: center;
  padding: ${size.gap.default}px 0;
`;

export const SearchTitle: typeof Text = styled(Text)`
`;

export const Service: typeof Button = styled(Button)`
  background-color: ${color.dark10};
`;

export const ServiceName: typeof Text = styled(Text)`
`;
