import { color, font, size } from "@shared/config";
import { Row, Text, TextView } from "@shared/ui";
import { Dimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Button, TouchableOpacity } from "../../../../haptic";
import { ContextModal } from "../../../../modal";
import {
	BlessCurseControl,
	ChaosTokenPreviewMemo as ChaosTokenPreview,
} from "../token";

const screen = Dimensions.get("screen");

export const Container: typeof ContextModal = styled(ContextModal).attrs({
	contentStyle: {
		backgroundColor: color.dark30,
		gap: size.gap.small,
	},
})`
  flex: 1;
`;

export const Content: typeof View = styled(View)`
  min-height: 90px;
  justify-content: flex-end;
`;

export const BlessCurse: typeof BlessCurseControl = styled(BlessCurseControl)`
  padding-top: ${size.gap.small}px;
`;

export const Sealed: typeof View = styled(View)`
	padding-top: ${size.gap.small}px;
`;

const maxHeight = Math.min(screen.height - 490, 250);

export const List: typeof FlatList = styled(FlatList).attrs({
	contentContainerStyle: {
		alignItems: "center",
	},
})`
  padding-bottom: ${size.gap.default}px;
  border-bottom-width: 1px;
  border-bottom-color: ${color.dark20};

  max-height: ${maxHeight}px;
`;

export const TokenRow: typeof Row = styled(Row)`
  justify-items: center;
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;

export const TokenButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  
`;

export const Title: typeof Text = styled(Text)`
  text-align: center;
`;

export const Hint: typeof TextView = styled(TextView)`
  text-align: center;
  margin-bottom: ${size.gap.small}px;
`;

export const RevealButton: typeof Button = styled(Button).attrs({
	textStyle: {
		fontSize: font.size.small,
	},
})`
  margin: ${size.gap.default}px auto 0px;
  border: 0px solid ${color.dark10};
  border-top-width: 1px;
`;
