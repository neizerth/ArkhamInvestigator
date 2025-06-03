import { ImageBackground, Value } from "@shared/ui";
import styled from "styled-components/native";
import { StatPicker } from "../../../common/StatPicker";

export const Container: typeof ImageBackground = styled(ImageBackground).attrs({
	contentFit: "contain",
})`
  height: 38px;
  width: 38px;
  justify-content: center;
  align-items: center;
`;

export const Counter: typeof StatPicker = styled(StatPicker).attrs({
	gap: 24,
})`
  
`;

export const CounterValue: typeof Value = styled(Value)`
  
`;
