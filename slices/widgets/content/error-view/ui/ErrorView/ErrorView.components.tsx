import { color, size, statusBarHeight } from "@shared/config";
import { Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex: 1;
  background-color: ${color.black};
  padding: ${size.gap.default}px;
  padding-top: ${statusBarHeight}px;
`;

export const Name: typeof Text = styled(Text)`
  
`;

export const Message: typeof Text = styled(Text)`
  
`;
