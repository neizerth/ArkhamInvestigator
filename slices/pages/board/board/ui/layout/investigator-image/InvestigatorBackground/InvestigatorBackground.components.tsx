import type { Box } from "@shared/model";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionBackground as BaseFactionBackground } from "../../../shared/background/FactionBackground";
import { DamageOverlay } from "../DamageOverlay";
import { HorrorOverlay } from "../HorrorOverlay";
import { InvestigatorImageBackground as InvestigatorBackground } from "../investigator-image-background/InvestigatorImageBackground";

type PropsWithView = {
	view: Box;
};

export const Container: FC<ViewProps & PropsWithView> = styled(View)`
  ${({ view }: PropsWithView) =>
		view &&
		css`
    height: ${view.height}px;
  `}
`;

export const Content: typeof View = styled(View)`
  position: relative;
  flex: 1;
`;

export const FactionBackground: typeof BaseFactionBackground = styled(
	BaseFactionBackground,
)`
  flex: 1;
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;

export const Background: typeof InvestigatorBackground = styled(
	InvestigatorBackground,
)`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Damage: typeof DamageOverlay = styled(DamageOverlay)`
  position: absolute;
  z-index: 4;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Horror: typeof HorrorOverlay = styled(HorrorOverlay)`
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;
