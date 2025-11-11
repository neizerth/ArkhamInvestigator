import { ChaosBagRevealedToken } from "@modules/chaos-bag/reveal/base/entities/ui";
import { color, size } from "@shared/config";
import { Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  padding-top: 7px;
`;

export const Expression: typeof Row = styled(Row)`
  flex-wrap: wrap;
  align-items:
`;

export const Token: typeof ChaosBagRevealedToken = styled(
	ChaosBagRevealedToken,
)`
  
`;

export const Item: typeof Row = styled(Row)`
  align-items: center;
`;

export const SignView: typeof View = styled(View)`
`;

export const Sign: typeof Text = styled(Text)`
  color: ${color.text};
  font-size: 22px;
`;

export const Result: typeof Item = styled(Item)`
  gap: ${size.gap.small}px;
  justify-content: flex-end;
  padding-right: ${size.gap.small}px
`;
