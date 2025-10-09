import styled, { css } from "styled-components/native";
import { color } from "../../../../config";
import { Button, type ButtonProps } from "../Button";

export const Container: typeof Button = styled(Button).attrs(
	({ disabled }: ButtonProps) => ({
		iconStyle: {
			color: disabled ? color.dark10 : color.light10,
		},
	}),
)`
  justify-content: center;
  align-items: center;
  ${({ disabled }: ButtonProps) =>
		css`
      border: 1px solid ${disabled ? color.dark20 : color.dark10};
  `}
`;
