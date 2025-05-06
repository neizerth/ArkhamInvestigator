import { ContextModal } from "@features/modal";
import { color, size } from "@shared/config";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { OverviewInvestigator } from "../OverviewInvestigator";

export const Container: typeof ContextModal = styled(ContextModal).attrs({
	contentStyle: {
		backgroundColor: color.dark30,
	},
})`
  flex: 1;
`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Board: typeof OverviewInvestigator = styled(OverviewInvestigator)`
  
`;

export const List: typeof FlatList = styled(FlatList)`
  
`;

export const Separator: typeof View = styled(View)`
  border-top-width: 1px;
  border-top-color: ${color.dark10};
  margin: 0 ${size.gap.small}px;
`;

export const Item: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;
