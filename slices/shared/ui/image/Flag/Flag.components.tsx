import { Alegreya } from "@assets/fonts";
import { color, font } from "@shared/config";
import { Image as BaseImage, View } from "react-native";
import styled from "styled-components/native";
import { UnscaledText } from "../../behavior/UnscaledText";
import { FLAG_HEIGHT, FLAG_SIZE } from "./Flag.styles";

export const Container: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
  height: ${FLAG_SIZE}px;
  width: ${FLAG_HEIGHT}px;
  position: relative;
`;

export const Overlay: typeof View = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Title: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${Alegreya.regular};
  font-size: ${font.size.medium}px;
  color: ${color.light10};
`;

export const Image: typeof BaseImage = styled(BaseImage).attrs({
	width: FLAG_SIZE,
	height: FLAG_HEIGHT,
})`
  height: ${FLAG_SIZE}px;
  width: ${FLAG_HEIGHT}px;
`;
