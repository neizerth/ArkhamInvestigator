import { Value } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { StatPicker } from "../StatPicker";

export const Container: typeof View = styled(View)`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Base: typeof View = styled(View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

export const BaseValue: typeof Value = styled(Value)`

`;

export const Picker: typeof StatPicker = styled(StatPicker)`

`;
