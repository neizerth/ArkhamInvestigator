import { GameText } from "@modules/core/theme/shared/ui";
import { color } from "@shared/config";
import styled from "styled-components/native";

export const Text: typeof GameText = styled(GameText)`
  color: ${color.text};
`;
