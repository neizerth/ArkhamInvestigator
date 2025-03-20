import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import styled from "styled-components/native";
import { UnscaledText } from "../../behavior/UnscaledText";

export const Text: typeof UnscaledText = styled(UnscaledText)`
  color: ${color.light10};
  font-family: ${Alegreya.regular};
  font-size: ${font.size.default}px;
`;

export const Bold: typeof Text = styled(Text)`
  font-family: ${Alegreya.bold};
`;

export const Italic: typeof Text = styled(Text)`
  font-family: ${Alegreya.italic};
`;
