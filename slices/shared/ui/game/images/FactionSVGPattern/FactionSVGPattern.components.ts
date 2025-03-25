import { SvgPatternImage } from "../../../image/SvgPatternImage";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import type { FactionSVGPatternProps } from "./FactionSVGPattern";

export const Container: FC<FactionSVGPatternProps> = styled(View)`
  ${({ faction }: FactionSVGPatternProps) => css`
    opacity: ${faction === "seeker" ? 0.07 : 0.1};
  `}
`;

export const Background: typeof SvgPatternImage = styled(SvgPatternImage)`
`;
