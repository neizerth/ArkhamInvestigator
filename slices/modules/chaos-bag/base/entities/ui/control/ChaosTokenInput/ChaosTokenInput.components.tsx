import {
	ChaosTokenCounter,
	ChaosTokenPreview,
} from "@modules/chaos-bag/base/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { NumericControl, Row } from "@shared/ui";
import styled from "styled-components/native";

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;

export const TokenButton: typeof TouchableOpacity = styled(TouchableOpacity)`
	
`;

export const Content: typeof Row = styled(Row)`
	gap: ${({ theme }) => theme.size.gap.small}px;
	align-items: center;
`;

export const Value: typeof ChaosTokenCounter = styled(ChaosTokenCounter)`
`;

export const Control: typeof NumericControl = styled(NumericControl).attrs(
	({ theme }) => ({
		buttonStyle: {
			// backgroundColor: "#D6CFB9",
			backgroundColor: "transparent",
			width: 40,
			height: 48,
		},
		textStyle: {
			// color: color.text,
			color: theme.color.light10,
		},
		minTextStyle: {
			color: theme.color.dark10,
		},
		maxTextStyle: {
			color: theme.color.dark10,
		},
	}),
)`
	gap: 0px;
`;
