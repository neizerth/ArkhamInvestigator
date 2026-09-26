import { GameText } from "@modules/core/theme/shared/ui";
import styled, { css } from "styled-components/native";
import { FactionModal } from "../../../base/ui";

export const Container = styled(FactionModal)`
  
`;

export const Text: typeof GameText = styled(GameText)`
  ${({ theme: { color, font } }) => css`
    color: ${color.light10};
    font-size: ${font.size.default}px;
  `}
`;
