import { font } from "@shared/config";
import { Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  
`;

export const Value: typeof Text = styled(Text)`
  font-size: ${font.size.default}px;
`;
