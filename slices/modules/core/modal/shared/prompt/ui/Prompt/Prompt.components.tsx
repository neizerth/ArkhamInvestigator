import { GameText } from "@modules/core/theme/shared/ui";
import { Input as TextInput } from "@shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionModal } from "../../../base/ui";

export const Container: typeof FactionModal = styled(FactionModal)`
`;

export const Content: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Input: typeof TextInput = styled(TextInput)`

`;

export const Text: typeof GameText = styled(GameText)`
  ${({ theme: { color, font } }) => css`
    color: ${color.light10};
    font-size: ${font.size.default}px;
  `}
`;

export const ErrorMessage: typeof GameText = styled(GameText)`
    ${({ theme: { color, font, fontFamily } }) => css`
    font-family: ${fontFamily.Alegreya.bold};

    color: ${color.status.error.light20};
    font-size: ${font.size.default}px;
  `}
`;
