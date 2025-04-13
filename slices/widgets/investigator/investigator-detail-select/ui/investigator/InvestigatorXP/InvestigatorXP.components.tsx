import { size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { Icon, Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorSettingsControl } from "../settings/InvestigatorSettingsControl";

export const Container: typeof View = styled(View)`
`;

export const Title: typeof Text = styled(Text)`
  font-family: ${Alegreya.medium};
  text-align: center;
  padding-bottom: 6px;
`;

export const Value: typeof Text = styled(Text)`
  font-family: ${Alegreya.medium};
  font-size: 30px;
  line-height: 37px;
`;

export const Controls: typeof Row = styled(Row)`
  padding-top: ${size.gap.default}px;
`;

export const ControlIcon: typeof Icon = styled(Icon)`
  font-size: 30px;
`;

export const Control: typeof InvestigatorSettingsControl = styled(
	InvestigatorSettingsControl,
)`
  flex: 1;
  justify-content: center;
`;
