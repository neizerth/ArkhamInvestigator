import { SvgPatternImage } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import type { FactionBackgroundProps } from "./FactionBackground";

export const Container: FC<FactionBackgroundProps> = styled(View)`
  ${({ faction }: FactionBackgroundProps) => css`
    opacity: ${faction === "seeker" ? 0.07 : 0.1};
  `}
`;

export const Background: typeof SvgPatternImage = styled(SvgPatternImage)`
`;
