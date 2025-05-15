import { ChaosBagRevealedToken } from "@features/chaos-bag/ui/reveal/ChaosBagRevealedToken";
import { color, font, size } from "@shared/config";
import { Row, Text } from "@shared/ui";
import { InvestigatorPreview } from "@widgets/investigator";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  padding: ${size.gap.small}px ${size.gap.default}px;
  align-items: center;
  gap: ${size.gap.default}px;
`;

export const Investigator: typeof InvestigatorPreview = styled(
	InvestigatorPreview,
)`
  border-radius: 24px;
`;

export const TokenList: typeof FlatList = styled(FlatList)`
  
`;

export const Token: typeof ChaosBagRevealedToken = styled(
	ChaosBagRevealedToken,
)`
  
`;

export const Item: typeof View = styled(View)`
  padding: ${size.gap.small}px 0px;
`;

export const Separator: typeof View = styled(View)`
  width: 1px;
  height: 15px;
  background-color: ${color.dark10};
`;

export const Position: typeof Text = styled(Text)`
  font-size: ${font.size.large}px;
  text-align: center;
  width: 36px;
`;
