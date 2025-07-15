import { font } from "@shared/config";
import { Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 44px;
`;

export const Count = styled(Text)`
  font-size: ${font.size.medium}px;
  text-align: right;
`;
