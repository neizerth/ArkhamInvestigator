import { color } from "@shared/config";
import { View, Text as BaseText } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  background-color: ${color.dark40};
  flex: 1;
`