import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { Text as NativeText } from "react-native";
import styled from "styled-components/native";

export const Text: typeof NativeText = styled(NativeText)`
  color: ${color.light10};
  font-family: ${Alegreya.regular};
  font-size: ${font.size.default}px;
`

export const Bold: typeof Text = styled(Text)`
  font-family: ${Alegreya.bold};
`

export const Italic: typeof Text = styled(Text)`
  font-family: ${Alegreya.italic};
`