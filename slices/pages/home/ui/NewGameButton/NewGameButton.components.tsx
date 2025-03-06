import { color, font } from "@shared/config";
import { Teutonic } from "@shared/fonts/Teutonic";
import { Text as BaseText } from "react-native";
import styled from "styled-components/native";

export const Text: typeof BaseText = styled(BaseText)`
  font-family: ${Teutonic.regular};
  font-size: ${font.size.lead}px;
  color: ${color.light10};
`