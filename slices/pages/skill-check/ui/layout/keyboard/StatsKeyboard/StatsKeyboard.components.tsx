import { Row, ScrollView } from "@shared/ui";
import {
	IconKeyboardButton,
	type IconKeyboardButtonProps,
} from "@widgets/control/keyboard-button";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof ScrollView = styled(ScrollView)`

`;

export const Content: typeof Row = styled(Row)`
  justify-content: center;
  align-items: center;
`;

type ButtonProps = Omit<IconKeyboardButtonProps, "size">;

export const Button: FC<ButtonProps> = styled(IconKeyboardButton).attrs({
	size: "small",
})`
    align-items: center;
    width: 37px;
  `;

export const Rule: typeof View = styled(View)`
  ${({ theme: { color, size } }) => css`
  flex: 1;
  width: 1px;
  height: 20px;
  background-color: ${color.dark20};
  margin: 0 ${size.gap.small}px;
`}`;
