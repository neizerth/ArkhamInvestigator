import { Alegreya } from "@assets/fonts";
import { NumericControl } from "@features/haptic/ui/control";
import { color, size } from "@shared/config";
import { Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { HealthValue } from "../../../../value/health";
import { SanityValue } from "../../../../value/sanity";

export const Container: typeof View = styled(View)`
  /* padding: ; */
`;

export const Title: typeof Text = styled(Text)`
  font-family: ${Alegreya.medium};
`;

export const Controls: typeof Row = styled(Row)`
  padding-top: ${size.gap.default}px;
`;

export const Control: typeof NumericControl = styled(NumericControl)`
  flex: 1;
  justify-content: center;
`;

export const SanityControl: typeof Control = styled(Control).attrs({
	color: color.sanity,
})`
`;

export const HealthControl: typeof Control = styled(Control).attrs({
	color: color.health,
})`
`;

export const Health: typeof HealthValue = styled(HealthValue)`
  
`;

export const Sanity: typeof SanityValue = styled(SanityValue)`
  
`;
