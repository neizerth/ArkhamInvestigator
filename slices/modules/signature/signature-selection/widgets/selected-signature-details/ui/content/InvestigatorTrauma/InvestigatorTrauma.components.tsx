import { HealthValue, SanityValue } from "@modules/board/base/entities/base/ui";
import { NumericControl, Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  /* padding: ; */
`;

export const Title: typeof Text = styled(Text)`
  font-family: ${({ theme }) => theme.fontFamily.Alegreya.medium};
`;

export const Controls: typeof Row = styled(Row)`
  padding-top: ${({ theme }) => theme.size.gap.default}px;
`;

export const Control: typeof NumericControl = styled(NumericControl)`
  flex: 1;
  justify-content: center;
`;

export const SanityControl: typeof Control = styled(Control)`
`;

export const HealthControl: typeof Control = styled(Control)`
`;

export const Health: typeof HealthValue = styled(HealthValue)`
`;

export const Sanity: typeof SanityValue = styled(SanityValue)`
  
`;
