import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { Row as BaseRow, Text, TextView } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { HapticModeSelect } from "../HapticModeSelect";
import { LanguagePicker } from "../LanguagePicker";

export const Container: typeof View = styled(View)`
  background-color: ${color.dark40};
  flex: 1;
  align-items: center;
`;

export const Content: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${size.gap.default}px;
  gap: ${size.gap.default}px;
`;

export const Label: typeof TextView = styled(TextView).attrs({
	contentContainerStyle: {
		width: 80,
	},
})`
  font-size: ${font.size.default}px;
  text-align: right;
`;

export const LanguageSelect: typeof LanguagePicker = styled(LanguagePicker)`
 
`;

export const HapticSelect: typeof HapticModeSelect = styled(HapticModeSelect)`
 
`;
