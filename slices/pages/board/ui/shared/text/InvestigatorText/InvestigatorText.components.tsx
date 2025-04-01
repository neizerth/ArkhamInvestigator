import { color } from "@shared/config";
import { ArnoPro } from "@shared/fonts";
import { GameText } from "@widgets/game-text";
import styled from "styled-components/native";

export const Text: typeof GameText = styled(GameText)`
  font-family: ${ArnoPro.regular};
  color: ${color.text};
`;
