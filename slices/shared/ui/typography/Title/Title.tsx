import { Text as NativeText } from "react-native";
import styled from "styled-components/native";
import { color, font } from "../../../config";

export const Title: typeof NativeText = styled(NativeText)`
  font-family: AlegreyaMedium;
  font-size: ${font.size.medium}px;
  color: ${color.light10};
  text-align: center;
`