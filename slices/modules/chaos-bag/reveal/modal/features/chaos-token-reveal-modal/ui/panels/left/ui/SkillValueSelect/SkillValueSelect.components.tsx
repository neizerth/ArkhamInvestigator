import { color } from "@shared/config";
import { Button, Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

export const Skill: typeof Button = styled(Button).attrs({
	iconStyle: {
		fontSize: 30,
		lineHeight: 30,
		width: 30,
	},
})`
  color: ${color.light10};
  background-color: transparent;
  justify-content: center;
`;

export const Menu: typeof Row = styled(Row)`
  position: absolute;
  z-index: 20;
  left: -15px;
  top: 50px;
  background-color: ${color.black};
  border-radius: 45px;
  padding: 10px;
`;
