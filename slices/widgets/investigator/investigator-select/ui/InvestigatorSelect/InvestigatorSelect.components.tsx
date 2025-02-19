import { ScrollView, Text } from "react-native";
import styled from "styled-components/native";
import { color, font } from "@shared/config";

export const Container: typeof ScrollView = styled(ScrollView)`
  flex: 1;
`

export const Separator: typeof Text = styled(Text)`
  font-family: AlegreyaMedium;
  text-align: center;
  font-size: ${font.size.l}px;
  color: ${color.light10};
  margin: 20px 0;
`