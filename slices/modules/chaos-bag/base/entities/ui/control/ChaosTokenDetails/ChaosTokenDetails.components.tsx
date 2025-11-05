import { ChaosTokenMemo as ChaosToken } from "@modules/chaos-bag/base/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { font, size } from "@shared/config";
import { Row, TextView } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { ChaosTokenInput } from "../ChaosTokenInput";

export const Container: typeof View = styled(View)`
  padding: ${size.gap.small}px 0px;
`;

export const Content: typeof Row = styled(Row)`
  padding: 0px ${size.gap.small}px;
  align-items: center;
`;

export const Preview: typeof Row = styled(Row)`
  padding: 0px ${size.gap.small}px;
  gap: ${size.gap.small}px;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const Input: typeof ChaosTokenInput = styled(ChaosTokenInput)`
  
`;

export const TokenIcon: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const Count: typeof TextView = styled(TextView).attrs({
	contentContainerStyle: {
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
