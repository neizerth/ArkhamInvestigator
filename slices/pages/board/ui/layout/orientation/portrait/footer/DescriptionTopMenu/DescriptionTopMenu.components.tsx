import { color } from "@shared/config";
import { DefinedIconButtonProps, IconButton, Row } from "@shared/ui";
import { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
`

export const Exit: FC<DefinedIconButtonProps> = styled(IconButton).attrs({
	icon: "resign",
	iconStyle: {
		color: color.light10,
		fontSize: 30,
	},
})`
  `;

export const Clear: FC<DefinedIconButtonProps> = styled(IconButton).attrs({
	icon: "repeat",
	iconStyle: {
		color: color.light10,
		fontSize: 30,
	},
})`
  `;
