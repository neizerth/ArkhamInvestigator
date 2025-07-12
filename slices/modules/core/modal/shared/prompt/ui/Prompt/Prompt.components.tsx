import { GameText } from "@entities/game-text";
import { color, font } from "@shared/config";
import { Input as TextInput } from "@shared/ui";
import styled from "styled-components/native";
import { FactionModal } from "../../../base/ui";

export const Container = styled(FactionModal)`
  
`;

export const Input: typeof TextInput = styled(TextInput)`

`;

export const Text: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;
