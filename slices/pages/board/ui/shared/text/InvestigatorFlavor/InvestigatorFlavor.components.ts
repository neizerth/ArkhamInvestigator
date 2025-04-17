import { ArnoPro } from "@assets/fonts";
import { color } from "@shared/config";
import { GameText } from "@widgets/game/game-text";
import styled from "styled-components/native";

export const Text = styled(GameText)`
  font-family: ${ArnoPro.italic};
  color: ${color.text};
  text-align: center;
`;
