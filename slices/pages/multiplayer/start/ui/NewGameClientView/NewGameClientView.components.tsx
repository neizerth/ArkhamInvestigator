import { size } from "@shared/config";
import { Input } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const CodeInput: typeof Input = styled(Input).attrs({
	autoCapitalize: "none",
})`
  
`;
