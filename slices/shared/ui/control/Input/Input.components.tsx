"use client";

import { Alegreya } from "@assets/fonts";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { color, font, size } from "../../../config";

export const Input: typeof TextInput = styled(TextInput).attrs({
	placeholderTextColor: color.dark10,
})`
  border: 1px solid ${color.dark10};
  padding: ${size.gap.default}px;
  border-radius: ${size.borderRadius.default}px;
  color: ${color.light10};
  font-family: ${Alegreya.regular};
  font-size: ${font.size.medium}px;
`;
