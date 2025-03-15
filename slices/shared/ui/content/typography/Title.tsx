import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { Text as NativeText } from "react-native";
import styled from "styled-components/native";

export const Title: typeof NativeText = styled(NativeText)`
  font-family: ${Alegreya.medium};
  font-size: ${font.size.medium}px;
  margin: ${size.gap.default}px 0px;
  color: ${color.light10};
  text-align: center;
`