import { color, size } from "@shared/config";
import { Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { ContextModal } from "../../../modal";
import {
	BlessCurseControl,
	ChaosTokenPreviewMemo as ChaosTokenPreview,
} from "../token";

export const Container: typeof ContextModal = styled(ContextModal).attrs({
	contentStyle: {
		backgroundColor: color.dark40,
	},
})`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
`;

export const BlessCurse: typeof BlessCurseControl = styled(BlessCurseControl)`
`;

export const Sealed: typeof View = styled(View)`
  border-bottom-width: 1px;
  border-bottom-color: ${color.dark20};
`;

export const List: typeof Row = styled(Row)`
  flex-wrap: wrap;
  padding: ${size.gap.small}px 0px;
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;

export const Title: typeof Text = styled(Text)`
  text-align: center;
`;
