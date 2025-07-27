import { color, font } from "@shared/config";
import { GameText } from "@shared/ui";
import styled from "styled-components/native";
import { FactionModal } from "../../../base/ui";

export const Container = styled(FactionModal)`
  
`;

export const Text: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;
