import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { BlessCurseControl } from "../../../../../../../../../features/game/chaos-bag/ui/token";
import { ChaosTokenRevealHistory } from "../../../../../../base/entities/ui/ChaosTokenRevealHistory";

export const Container: typeof View = styled(View)`
  align-items: center;
`;

export const BlessCurse: typeof BlessCurseControl = styled(BlessCurseControl)`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${size.borderRadius.default}px;
  padding: 2px 0;
  border-radius: 32px;
`;

export const History: typeof ChaosTokenRevealHistory = styled(
	ChaosTokenRevealHistory,
)`
`;
