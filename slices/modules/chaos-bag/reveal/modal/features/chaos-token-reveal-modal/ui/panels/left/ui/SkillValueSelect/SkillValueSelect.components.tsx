import { color } from "@shared/config";
import { Button, Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

const iconStyle = {
	fontSize: 30,
	lineHeight: 30,
	width: 30,
};

export const Skill: typeof Button = styled(Button).attrs({
	iconStyle,
})`
  color: ${color.light10};
  background-color: transparent;
`;

export const Toggle: typeof Skill = styled(Skill).attrs({
	iconStyle: {
		...iconStyle,
		textAlign: "center",
		width: 40,
	},
})`
  padding: 15px;
`;

export const Menu: typeof Row = styled(Row)`
  position: absolute;
  z-index: 20;
  left: -5px;
  top: 60px;
  background-color: ${color.black};
  border-radius: 45px;
  padding: 10px;
`;
