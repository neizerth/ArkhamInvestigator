import styled, { css } from "styled-components/native";
import { Button } from "../Button";

export const Container: typeof Button = styled(Button).attrs(
	({ disabled, theme }) => ({
		iconStyle: {
			color: disabled ? theme.color.dark10 : theme.color.light10,
		},
	}),
)`
  justify-content: center;
  align-items: center;
  ${({ disabled, theme }) =>
		css`
      border: 1px solid ${disabled ? theme.color.dark20 : theme.color.dark10};
  `}
`;
