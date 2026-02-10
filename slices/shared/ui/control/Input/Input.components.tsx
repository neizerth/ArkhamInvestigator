"use client";

import { Alegreya } from "@assets/fonts";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { color, font, size } from "../../../config";
import { Text } from "../../content";

export const Container: typeof View = styled(View)`
  position: relative;
  min-height: 50px;
`;

export const Input: typeof TextInput = styled(TextInput).attrs({
	placeholderTextColor: color.dark10,
})`
  border: 1px solid ${color.dark10};
  padding: ${size.gap.default}px;
  border-radius: ${size.borderRadius.default}px;
  color: ${color.light10};
  font-family: ${Alegreya.regular};
  font-size: ${font.size.medium}px;
  flex: 1;
`;

export const FixedPlaceholder: typeof Text = styled(Text)`
  position: absolute;
  z-index: 1;
  left: ${size.gap.small}px;
  top: -10px;
  color: ${color.light10};
  font-size: ${font.size.small}px;
  padding: 0 ${size.gap.small}px;
  background-color: ${color.dark30};
`;
