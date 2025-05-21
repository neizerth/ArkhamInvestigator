import { color } from "@shared/config";
import { Page } from "@shared/ui";
import { TopBarButton } from "@widgets/navigation";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ChaosBagRevealItem } from "../ChaosBagRevealItem";

export const Container: typeof Page = styled(Page)`
  background-color: ${color.dark30};
`;

export const List: typeof FlatList = styled(FlatList)`
  
`;

export const Item: typeof ChaosBagRevealItem = styled(ChaosBagRevealItem)`
  
`;

export const ClearButton: typeof TopBarButton = styled(TopBarButton).attrs({
	iconStyle: {
		fontSize: 18,
		lineHeight: 18,
		color: color.light10,
	},
})`
  align-items: flex-end;
`;
