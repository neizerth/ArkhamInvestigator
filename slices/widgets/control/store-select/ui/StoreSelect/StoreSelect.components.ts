import { HapticSelect } from "@features/haptic";
import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { Row, Text } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  position: relative;
  padding-top: ${size.gap.medium}px;
  background-color: ${color.dark30};
  border-radius: ${size.borderRadius.default}px;
`;

export const Select: typeof HapticSelect = styled(HapticSelect).attrs({
	iconStyle: {
		position: "relative",
		top: -size.gap.small,
	},
})`
  flex: 1;
  position: relative;
`;

export const Label: typeof Text = styled(Text)`
  font-family: ${Alegreya.italic};
  position: absolute;
  z-index: 1;
  left: ${size.gap.small}px;
  top: ${size.gap.small}px;
  font-size: ${font.size.small};
`;
