import { ContextModal } from "@modules/core/modal/shared/base/ui";
import { color, size } from "@shared/config";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
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

export const List: typeof View = styled(View)`
  
`;

export const Separator: typeof View = styled(View)`
  border-top-width: 1px;
  border-top-color: ${color.dark10};
  margin: 0 ${size.gap.small}px;
`;

export const Item: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	{
		color: color.dark10,
	},
)`
	padding: ${size.gap.default}px 0;
  justify-content: center;
  min-height: 300px;
  flex: 1;
`;
