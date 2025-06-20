import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../../../../../../haptic";
import { ChaosTokenPreview, ChaosTokenValuePicker } from "../../../../token";
import { ChaosTokenValue } from "../../../../token/ChaosTokenValue";
import { ExpressionPanel } from "../ExpressionPanel";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const TokenButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
`;

export const LastToken: typeof ChaosTokenPreview = styled(
	ChaosTokenPreview,
).attrs({
	size: 150,
	tokenPadding: 5,
	sealOffset: 5,
})`
  
`;

export const Expression: typeof ExpressionPanel = styled(ExpressionPanel)`
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: ${size.gap.large}px;
`;

export const ControlContainer: typeof View = styled(View)`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  border-radius: 150px;
  overflow: hidden;
`;

export const Control: typeof ChaosTokenValuePicker = styled(
	ChaosTokenValuePicker,
).attrs({
	gap: 110,
	valueStyle: {
		fontSize: 60,
	},
})`
  
`;

export const TokenValue: typeof ChaosTokenValue = styled(ChaosTokenValue)`

`;
