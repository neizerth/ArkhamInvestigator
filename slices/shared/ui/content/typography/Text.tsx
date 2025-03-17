import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import styled from "styled-components/native";
import { AppText } from "../AppText";

export const Text: typeof AppText = styled(AppText)`
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