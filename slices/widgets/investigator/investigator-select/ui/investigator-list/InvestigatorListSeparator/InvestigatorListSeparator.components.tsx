import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { Row, UnscaledText } from "@shared/ui";
import { Image } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";
import { rule, separatorAside } from "./images";

export const Container: typeof Row = styled(Row)`
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
  overflow: hidden;
`;

const ruleColor = color.light10;
const cornerOffset = size.gap.medium;

export const RuleContainer: typeof View = styled(View)`
  position: absolute;
  left: ${cornerOffset}px;
  right: ${cornerOffset}px;
  overflow: hidden;
  bottom: 1.8px;
`;

export const Rule: typeof Image = styled(Image).attrs({
	source: rule,
	tintColor: ruleColor,
})`
  height: 1.5px;
`;

export const SeparatorDecoration: typeof Image = styled(Image).attrs({
	source: separatorAside,
	resizeMode: "contain",
	tintColor: ruleColor,
})`
  width: 60px;
  height: 50px;
  margin-top: 5px;
  position: relative;
`;

export const SeparatorBefore: typeof Image = styled(SeparatorDecoration)`
  right: -${cornerOffset}px;
`;

export const SeparatorAfter: typeof Image = styled(SeparatorDecoration)`
  transform: scale(-1, 1);
  left: -${cornerOffset}px;
`;
