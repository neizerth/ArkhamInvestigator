import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../../../../../../haptic";
import { ChaosTokenPreview } from "../../../../token";
import { ExpressionPanel } from "../ExpressionPanel";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const TokenButton: typeof TouchableOpacity = styled(TouchableOpacity)`
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
