import { Dimensions, View } from "react-native";
import { Image } from "react-native";
import styled from "styled-components/native";
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

export const Background: typeof Image = styled(Image)`
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
