import {
	NumericControl,
	TouchableOpacity,
} from "@modules/core/haptic/shared/ui";
import { color, font, size } from "@shared/config";
import { Row, TextView } from "@shared/ui";
import styled from "styled-components/native";
import { ChaosTokenMemo as ChaosToken } from "../single";

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const TokenButton: typeof TouchableOpacity = styled(TouchableOpacity)`
	
`;

export const Content: typeof Row = styled(Row)`
`;

export const Value: typeof TextView = styled(TextView).attrs({
	contentContainerStyle: {
		alignItems: "center",
		justifyContent: "center",
		width: 36,
		height: 44,
		paddingRight: size.gap.small,
	},
})`
	font-size: ${font.size.medium}px;
	text-align: right;
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
		paddingTop: 6,
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
