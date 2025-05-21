import { Alegreya } from "@assets/fonts";
import { View } from "react-native";
import styled from "styled-components/native";
import { color, font, size } from "../../../config";
import { Text, TextView } from "../../content";
import { Dropdown } from "../Dropdown";

export const Container: typeof View = styled(View)`
  position: relative;
  border-radius: ${size.borderRadius.default}px;
  gap: ${size.gap.default}px;
`;

export const Group: typeof View = styled(View)`
`;

export const Select: typeof Dropdown = styled(Dropdown).attrs({
	iconStyle: {
		position: "relative",
	},
	selectedTextStyle: {
		paddingTop: 20,
	},
	placeholderStyle: {
		paddingTop: 20,
	},
})`
  position: relative;
`;

export const Label: typeof Text = styled(Text)`
  font-family: ${Alegreya.italic};
  position: absolute;
  z-index: 1;
  left: ${size.gap.small + 1}px;
  top: 8px;
  font-size: ${font.size.small}px;
`;

export const Hint: typeof TextView = styled(TextView)`
  font-family: ${Alegreya.italic};
  color: ${color.gray20};
`;
