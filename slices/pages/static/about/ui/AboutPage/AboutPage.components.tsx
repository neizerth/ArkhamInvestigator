import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { View, Text as BaseText } from "react-native";
import styled from "styled-components/native";


export const Text: typeof BaseText = styled(BaseText)`
  flex: 1;
  color: ${color.light10};
  font-family: ${Alegreya.regular};
  font-size: ${font.size.default};
`

