import { COLOR } from "@shared/config";
import { View, Text } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  background-color: ${COLOR.DARK30};
  flex: 1;
`

export const Title: typeof Text = styled(Text)`
  font-family: 'DMSerifDisplayRegular';
  font-size: 32px;
  color: ${COLOR.LIGHT10};
  text-align: center;
  padding: 20px 0 10px;
`