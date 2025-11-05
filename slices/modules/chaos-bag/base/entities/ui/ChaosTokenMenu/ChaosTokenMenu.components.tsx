import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import type { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { Button } from "@shared/ui";
import { type TextStyle, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(View)`

`;

const iconStyle: TextStyle = {
	textAlign: "center",
	fontSize: 18,
	lineHeight: 18,
	color: color.light10,
};

export const Action: typeof Button = styled(Button).attrs({
	iconStyle,
})`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  padding: 0px;
  justify-content: center;
  align-items: center;
`;

export const Remove: typeof Action = styled(Action)`
  background-color: ${color.doom.dark};
  bottom: -5px;
  left: 50%;
  transform: translateX(-14px);
`;

export const Reveal: typeof Action = styled(Action).attrs({
	iconStyle: {
		...iconStyle,
		color: color.dark40,
	},
})`
  background-color: ${chaosToken.color.selected};
  left: -7px;
  top: 0px;
`;

export const Close: typeof Action = styled(Action).attrs({
	iconStyle: {
		...iconStyle,
		color: color.dark10,
		fontSize: 14,
	},
})`
  background-color: ${color.light10};
  padding-left: 1px;
  right: -7px;
  top: 0px;
`;

export const Resolve: typeof Action = styled(Action).attrs({
	iconStyle: {
		...iconStyle,
		color: color.light10,
		fontSize: 20,
		lineHeight: 20,
	},
})`
  background-color: ${color.black};
  padding-left: 2px;
  padding-top: 1px;
  left: -7px;
  bottom: -5px;
`;
