import { color, font, size } from "@shared/config";
import { Row, TextView } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../../../haptic";
import { ChaosTokenInput } from "../ChaosTokenInput";
import { ChaosToken } from "../single";

export const Container: typeof View = styled(View)`
  padding: ${size.gap.small}px 0px;
  border-top-width: 1px;
  border-top-color: ${color.dark20};
`;

export const Content: typeof Row = styled(Row)`
  padding: 0px ${size.gap.small}px;
`;

export const Preview: typeof Row = styled(Row)`
  padding: 0px ${size.gap.small}px;
  gap: ${size.gap.small}px;
  flex: 1;
  justify-content: flex-end;
`;

export const Input: typeof ChaosTokenInput = styled(ChaosTokenInput)`
  
`;

export const TokenIcon: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const Count: typeof TextView = styled(TextView).attrs({
	contentContainerStyle: {
		// backgroundColor: color.dark40,
		width: 30,
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 3,
	},
})`
  font-size: ${font.size.medium}px;
`;

export const Token: typeof TouchableOpacity = styled(TouchableOpacity)`
  
`;
