import { AnimatedGrayscaleImage } from "@shared/ui";
import { Dimensions, View } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionBackground as BaseFactionBackground } from "../../../shared/background/FactionBackground";
import { DamageOverlay, HorrorOverlay } from "../effects";

const screen = Dimensions.get("screen");

export const Container: typeof View = styled(View)`
  height: ${screen.height}px;
`;

export const Content: typeof View = styled(View)`
  position: relative;
  flex: 1;
`;

export const absoluteFill = css`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const FactionBackground: typeof BaseFactionBackground = styled(
	BaseFactionBackground,
)`
  flex: 1;
  ${absoluteFill}
`;

export const Background: typeof AnimatedGrayscaleImage = styled(
	AnimatedGrayscaleImage,
)`
  ${absoluteFill}
  z-index: 2;
`;

export const Damage: typeof DamageOverlay = styled(DamageOverlay)`
  ${absoluteFill}
  z-index: 4;
`;

export const Horror: typeof HorrorOverlay = styled(HorrorOverlay)`
  ${absoluteFill}
  z-index: 3;
`;
