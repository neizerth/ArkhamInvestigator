import { color, size } from "@shared/config";
import { Button, Row } from "@shared/ui";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  
`;

export const Services: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Service: typeof Button = styled(Button)`
  background-color: ${color.dark20};
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	{
		color: color.dark10,
	},
)`
`;

export const Loading: typeof Row = styled(Row)`
  gap: ${size.gap.default}px;
  align-items: center;
  justify-content: center;
  padding: ${size.gap.default}px 0;
`;
