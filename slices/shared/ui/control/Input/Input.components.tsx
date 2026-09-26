"use client";

import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { Text } from "../../content";

export const Container: typeof View = styled(View)`
  position: relative;
  min-height: 50px;
`;

export const Input: typeof TextInput = styled(TextInput).attrs(({ theme }) => ({
	placeholderTextColor: theme.color.dark10,
}))`
    flex: 1;
  ${({ theme: { color, size, font, fontFamily } }) => css`
    font-family: ${fontFamily.Alegreya.regular};

    border: 1px solid ${color.dark10};
    padding: ${size.gap.default}px;
    border-radius: ${size.borderRadius.default}px;
    color: ${color.light10};
    font-size: ${font.size.medium}px;
  `}
`;

export const FixedPlaceholder: typeof Text = styled(Text)`
  position: absolute;
  z-index: 1;
  top: -10px;
  ${({ theme: { size, color, font } }) => css`
    left: ${size.gap.small}px;
    color: ${color.light10};
    font-size: ${font.size.small}px;
    padding: 0 ${size.gap.small}px;
    background-color: ${color.dark30};
  `}
`;
