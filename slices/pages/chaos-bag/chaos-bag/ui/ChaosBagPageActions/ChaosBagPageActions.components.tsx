import { Button, Row } from "@shared/ui";
import styled, { css } from "styled-components/native";

const TopButton: typeof Button = styled(Button).attrs(({ theme }) => ({
	textStyle: {
		fontSize: theme.font.size.small,
		textAlign: "left",
	},
	iconStyle: {
		fontSize: 14,
	},
}))``;

export const SetupButton: typeof TopButton = styled(TopButton)`
	${({ theme: { color, size } }) => css`
		background-color: ${color.dark20};
		padding: ${size.gap.small}px ${size.gap.default}px;
	`}
`;

export const ClearButton: typeof TopButton = styled(TopButton).attrs({
	iconStyle: {
		textAlign: "center",
	},
})`
	${({ theme: { color, size } }) => css`
		background-color: ${color.dark20};
		padding: ${size.gap.small}px ${size.gap.default}px;
		justify-content: center;
	`}
`;

export const Container: typeof Row = styled(Row)`
	gap: ${({ theme }) => theme.size.gap.default}px;
	align-items: stretch;
`;
