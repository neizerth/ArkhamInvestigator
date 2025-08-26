import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import {
	InvestigatorImageBackground,
	type InvestigatorImageBackgroundProps,
} from "../InvestigatorImageBackground";

export const Container: FC<ViewProps> = styled(View)`
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

type BackgroundProps = InvestigatorImageBackgroundProps & {
	hidden?: boolean;
};

export const Background: FC<BackgroundProps> = styled(
	InvestigatorImageBackground,
)`
  z-index: 2;
  ${({ hidden }: BackgroundProps) =>
		hidden &&
		css`
    opacity: 0;
  `}
`;

export const PrevBackground: typeof Background = styled(Background)`
  z-index: 1;
`;
