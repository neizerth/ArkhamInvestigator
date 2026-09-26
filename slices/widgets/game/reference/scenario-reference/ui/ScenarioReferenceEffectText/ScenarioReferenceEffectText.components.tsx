import { GameText } from "@modules/core/theme/shared/ui";
import styled from "styled-components/native";

export const Text: typeof GameText = styled(GameText)`
  color: ${({ theme }) => theme.color.text};
`;
