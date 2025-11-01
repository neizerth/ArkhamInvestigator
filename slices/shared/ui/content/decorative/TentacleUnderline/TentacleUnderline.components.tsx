import { View } from "react-native";
import styled from "styled-components/native";
import { color } from "../../../../config";
import { Row } from "../../../grid";
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

export const Group: typeof View = styled(View)`
  flex-shrink: 0;
  position: relative;
`;

export const Content: typeof View = styled(View)`
  display: inline-flex;
`;

const asideOffset = {
	x: -asideWidth * 0.6,
	y: asideHeight * 0.09,
};

export const RuleContainer: typeof View = styled(View)`
  position: absolute;
  left: -10px;
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

export const Decoration: typeof Aside = styled(Aside).attrs({
	width: asideWidth,
	height: asideHeight,
	fill: color.light10,
})`
  position: absolute;
  bottom: ${asideOffset.y}px;
`;

export const Left: typeof Decoration = styled(Decoration)`
  left: ${asideOffset.x}px;
`;

export const Right: typeof Decoration = styled(Decoration)`
  transform: scale(-1, 1);
  right: ${asideOffset.x}px;
`;
