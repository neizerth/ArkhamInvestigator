import { color } from "@shared/config";
import { ArnoPro } from "@shared/fonts";
import { GameText } from "@widgets/game/game-text";
import styled from "styled-components/native";

export const Text = styled(GameText)`
  font-family: ${ArnoPro.italic};
  color: ${color.text};
  text-align: center;
`;
