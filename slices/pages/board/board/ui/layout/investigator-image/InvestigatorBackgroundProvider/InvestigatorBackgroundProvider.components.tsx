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
	selected: boolean;
};

export const Background: FC<BackgroundProps> = styled(
	InvestigatorImageBackground,
)`
  opacity: 0;
  ${({ selected }: BackgroundProps) =>
		selected &&
		css`
    opacity: 1;
  `}
`;
