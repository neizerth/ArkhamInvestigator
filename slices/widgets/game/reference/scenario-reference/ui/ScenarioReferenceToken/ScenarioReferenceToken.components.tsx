import { ChaosToken } from "@features/game/chaos-bag";
import { ChaosTokenValue } from "@features/game/chaos-bag/ui/token/ChaosTokenValue";
import { View } from "react-native";
import styled from "styled-components/native";
import { Picker } from "../../../../../control/picker";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const ControlContainer: typeof View = styled(View)`
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  border-radius: 48px;
  background-color: #d6cfb999;
  overflow: hidden;
`;

export const Control: typeof Picker = styled(Picker).attrs({
	gap: 24,
})`
  
`;

export const TokenValue: typeof ChaosTokenValue = styled(ChaosTokenValue)`
  font-size: 30px;
`;
