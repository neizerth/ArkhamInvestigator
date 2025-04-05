import { HapticSlider } from "@features/haptic";
import { font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { type Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof Row = styled(View)`
  position: relative;
  border-radius: ${size.borderRadius.default}px;
  padding: ${size.gap.default}px ${size.gap.small}px;
  gap: ${size.gap.default}px;
`;

export const Slider: typeof HapticSlider = styled(HapticSlider)`
  
`;

export const Label: typeof Text = styled(Text)`
  font-family: ${Alegreya.italic};
  font-size: ${font.size.small}px;
`;
