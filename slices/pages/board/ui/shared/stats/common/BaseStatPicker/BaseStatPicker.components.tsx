import { View } from "react-native";
import { StatPicker } from "../StatPicker";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 48px;
`

export const Picker: typeof StatPicker = styled(StatPicker)`
`;

