import { type DefinedIconButtonProps, IconButton } from "@shared/ui";
import { Row } from "@shared/ui";
import type { FC } from "react";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
  align-items: center;
`;

export const Button: typeof IconButton = styled(IconButton).attrs(
	({ theme }) => ({
		iconStyle: {
			color: theme.color.dark30,
			fontSize: 30,
		},
	}),
)`
    opacity: 0.8;
  `;

export const ChangeInvestigator: typeof Button = styled(Button)`
	margin-left: -10px;
`;

export const Hide: FC<DefinedIconButtonProps> = styled(Button).attrs(
	({ theme }) => ({
		icon: "right-arrow",
		iconStyle: {
			color: theme.color.dark30,
			fontSize: 30,
		},
	}),
)`
    transform: rotate(90deg);
  `;
