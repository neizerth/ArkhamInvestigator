import {
	ChaosTokenCounter,
	ChaosTokenPreview,
} from "@modules/chaos-bag/base/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, size } from "@shared/config";
import { NumericControl, Row } from "@shared/ui";
import styled from "styled-components/native";

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;

export const TokenButton: typeof TouchableOpacity = styled(TouchableOpacity)`
	
`;

export const Content: typeof Row = styled(Row)`
	gap: ${size.gap.small}px;
	align-items: center;
`;

export const Value: typeof ChaosTokenCounter = styled(ChaosTokenCounter)`
`;

export const Control: typeof NumericControl = styled(NumericControl).attrs({
	buttonStyle: {
		// backgroundColor: "#D6CFB9",
		backgroundColor: "transparent",
		width: 40,
		height: 48,
	},
	textStyle: {
		// color: color.text,
		color: color.light10,
	},
	minTextStyle: {
		color: color.dark10,
	},
	maxTextStyle: {
		color: color.dark10,
	},
})`
	gap: 0px;
`;
