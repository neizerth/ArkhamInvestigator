import { Alegreya } from "@assets/fonts";
import { color, font, size } from "@shared/config";
import { GameText } from "@shared/ui";
import { Input as TextInput } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { FactionModal } from "../../../base/ui";

export const Container: typeof FactionModal = styled(FactionModal)`
`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Input: typeof TextInput = styled(TextInput)`

`;

export const Text: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;

export const ErrorMessage: typeof GameText = styled(GameText)`
  color: ${color.status.error.light20};
  font-family: ${Alegreya.bold};
  font-size: ${font.size.default}px;
`;
