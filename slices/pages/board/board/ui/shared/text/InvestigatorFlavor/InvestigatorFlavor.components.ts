import { ArnoPro } from "@assets/fonts";
import { GameText } from "@entities/game-text";
import { color } from "@shared/config";
import styled from "styled-components/native";

export const Text = styled(GameText)`
  font-family: ${ArnoPro.italic};
  color: ${color.text};
  text-align: center;
`;
