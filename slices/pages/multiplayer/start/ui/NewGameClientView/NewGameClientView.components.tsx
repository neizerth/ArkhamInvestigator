import { color, size } from "@shared/config";
import { Button, type ButtonProps, Input } from "@shared/ui";
import { StoreCheckbox } from "@widgets/control/store-checkbox";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  gap: ${size.gap.default}px;
  padding: ${size.gap.default}px;
`;

export const CodeInput: typeof Input = styled(Input).attrs({
	autoCapitalize: "none",
})`
  
`;

export const Action: typeof Button = styled(Button)`
  background-color: ${color.dark20};
  border: 2px solid ${color.dark20};
  ${({ disabled }: ButtonProps) =>
		disabled &&
		css`
    background-color: transparent;
  `}
`;

export const Checkbox: typeof StoreCheckbox = styled(StoreCheckbox)`
  flex: 1;
`;
