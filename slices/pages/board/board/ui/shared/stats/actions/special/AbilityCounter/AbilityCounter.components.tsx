import { ImageBackground } from "@shared/ui";
import { Value } from "@widgets/investigator/value";
import styled from "styled-components/native";
import { StatPicker } from "../../../common/StatPicker";

export const Container: typeof ImageBackground = styled(ImageBackground)`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`;

export const Counter: typeof StatPicker = styled(StatPicker).attrs({
	gap: 24,
})`
  
`;

export const CounterValue: typeof Value = styled(Value)`
  
`;
