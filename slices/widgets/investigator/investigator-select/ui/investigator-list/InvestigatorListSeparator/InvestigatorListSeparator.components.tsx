import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { Row, UnscaledText } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { Aside, Line } from "./images";

const asideSize = {
	width: 78,
	height: 40,
	ratio: 78 / 40,
};

const lineSize = {
	width: 571,
	height: 5,
	ratio: 571 / 5,
};

const asideWidth = 60;
const asideHeight = asideWidth / asideSize.ratio;

const asideScale = asideSize.width / asideWidth;

const lineScale = asideScale * 0.7;
const lineHeight = lineSize.height * lineScale;
const lineWidth = lineSize.width * lineScale;

export const Container: typeof Row = styled(Row)`
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const Text: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${Alegreya.medium};
  text-align: center;
  font-size: ${font.size.medium}px;
  color: ${color.light10};
  margin-bottom: ${size.gap.default}px;
`;

export const Content: typeof View = styled(View)`
  flex-shrink: 0;
  position: relative;
`;

const asideOffset = {
	x: -asideWidth * 0.6,
	y: asideHeight * 0.1,
};

export const RuleContainer: typeof View = styled(View)`
  position: absolute;
  left: -7px;
  right: 0;
  overflow: hidden;
  bottom: ${asideOffset.y}px;
`;

export const Rule: typeof Line = styled(Line).attrs({
	width: lineWidth,
	height: lineHeight,
	fill: color.light10,
})`
  
`;

export const SeparatorAside: typeof Aside = styled(Aside).attrs({
	width: asideWidth,
	height: asideHeight,
	fill: color.light10,
})`
  position: absolute;
  top: ${asideOffset.y}px;
`;

export const SeparatorBefore: typeof SeparatorAside = styled(SeparatorAside)`
  left: ${asideOffset.x}px;
`;

export const SeparatorAfter: typeof SeparatorAside = styled(SeparatorAside)`
  transform: scale(-1, 1);
  right: ${asideOffset.x}px;
`;
