import { ChaosTokenValuePicker } from "@modules/chaos-bag/base/entities/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { size } from "@shared/config";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import { ExpressionPanel } from "../ExpressionPanel";
import { ModalChaosToken } from "../ModalChaosToken";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const TokenButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
`;

export const CurrentToken: typeof ModalChaosToken = styled(
	ModalChaosToken,
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

const ios = Platform.OS === "ios";

const iosLineHeight = (lineHeight: number) => {
	return ios ? {} : { lineHeight };
};

export const Control: typeof ChaosTokenValuePicker = styled(
	ChaosTokenValuePicker,
).attrs({
	gap: 110,
	valueStyle: {
		fontSize: 60,
	},
	autoFailStyle: {
		fontSize: 90,
		...iosLineHeight(90),
	},
	autoSuccessStyle: {
		fontSize: 180,
		...iosLineHeight(160),
		top: -10,
	},
})`
  
`;
