import { color } from "@shared/config";
import { Text as NativeText } from "react-native";
import styled from "styled-components/native";

export const Title: typeof NativeText = styled(NativeText)`
  font-family: 'AlegreyaMedium';
  font-size: 16px;
  color: ${color.light10};
  text-align: center;
`