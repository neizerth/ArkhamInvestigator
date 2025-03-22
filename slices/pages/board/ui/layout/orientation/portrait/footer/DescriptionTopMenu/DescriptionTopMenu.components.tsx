import { color } from "@shared/config";
import { type DefinedIconButtonProps, IconButton, Row } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
	align-items: center;
`;

export const Button: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		color: color.light10,
		fontSize: 30,
	},
})`
  `;

