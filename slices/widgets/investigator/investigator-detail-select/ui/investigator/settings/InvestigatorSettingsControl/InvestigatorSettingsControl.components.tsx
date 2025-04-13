import { Button as BaseButton } from "@features/haptic";
import { color, font, size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  align-items: center;
  gap: ${size.gap.small}px;
`;

export const Button: typeof BaseButton = styled(BaseButton).attrs({
	textStyle: {
		fontSize: font.size.xl,
		lineHeight: font.size.xl,
	},
})`
  padding: 0px;
  width: 28px;
  height: 28px;
  padding-top: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${color.dark20};
`;
