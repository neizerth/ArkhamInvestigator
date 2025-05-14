import { Alegreya } from "@assets/fonts";
import { HapticSelect } from "@features/haptic";
import { color, font, size } from "@shared/config";
import { Text, TextView } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
  border-radius: ${size.borderRadius.default}px;
  gap: ${size.gap.default}px;
`;

export const Group: typeof View = styled(View)`
`;

export const Select: typeof HapticSelect = styled(HapticSelect).attrs({
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
  flex: 1;
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
