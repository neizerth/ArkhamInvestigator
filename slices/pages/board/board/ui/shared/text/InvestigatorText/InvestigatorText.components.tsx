import { ArnoPro } from "@assets/fonts";
import { GameText } from "@entities/game-text";
import { color } from "@shared/config";
import styled from "styled-components/native";

export const Text: typeof GameText = styled(GameText)`
  font-family: ${ArnoPro.regular};
  color: ${color.text};
`;
