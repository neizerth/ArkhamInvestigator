import { ArnoPro } from "@assets/fonts";
import { color } from "@shared/config";
import { GameText } from "@widgets/game/game-text";
import styled from "styled-components/native";

export const Text: typeof GameText = styled(GameText)`
  font-family: ${ArnoPro.regular};
  color: ${color.text};
`;
