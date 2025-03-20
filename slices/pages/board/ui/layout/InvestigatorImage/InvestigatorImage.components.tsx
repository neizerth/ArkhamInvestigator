import { servicePadding } from "@pages/board/config";
import type { PropsWithLayout } from "@pages/board/model";
import type { Box } from "@shared/model";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionBackground as BaseFactionBackground } from "../../shared/background/FactionBackground";
import {
	LandscapeImage,
	type LandscapeImageProps,
} from "../orientation/landscape/LandscapeImage";
import { PortraitImageMemo as PortraitImage } from "../orientation/portrait/PortraitImage";

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

export const PortraitBackground: typeof PortraitImage = styled(PortraitImage)`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

type LandscapeBackgroundProps = LandscapeImageProps & PropsWithLayout;

export const LandscapeBackground: FC<LandscapeBackgroundProps> = styled(
	LandscapeImage,
)`
  position: absolute;
  z-index: 2;
  ${({ layout }: LandscapeBackgroundProps) => css`
    top: ${layout.height + layout.gap + servicePadding[layout.type].top}px;
    left: ${servicePadding.row.left}px;
  `}
`;
