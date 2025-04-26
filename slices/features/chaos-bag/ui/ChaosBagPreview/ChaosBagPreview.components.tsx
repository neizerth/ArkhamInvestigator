import { Row } from "@shared/ui";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ContextModal } from "../../../modal";
import {
	BlessCurseControl,
	ChaosTokenPreviewMemo as ChaosTokenPreview,
} from "../token";

export const Container: typeof ContextModal = styled(ContextModal)`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
`;

export const Content: typeof ScrollView = styled(ScrollView).attrs({
	contentContainerStyle: {
		justifyContent: "center",
		alignItems: "center",
	},
})`
  flex: 1;
`;

export const BlessCurse: typeof BlessCurseControl = styled(BlessCurseControl)`
`;

export const List: typeof Row = styled(Row)`
  flex-wrap: wrap;
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;
