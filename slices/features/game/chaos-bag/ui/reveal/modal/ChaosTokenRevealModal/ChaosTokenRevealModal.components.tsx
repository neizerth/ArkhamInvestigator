import { color, size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../../../../../haptic";
import { BlessCurseControl } from "../../../token";
import { ChaosTokenRevealHistoryMemo as ChaosTokenRevealHistory } from "../../ChaosTokenRevealHistory";
import { ChaosTokenRevealLoader } from "../../ChaosTokenRevealLoader";
import { BottomPanel, CenterPanel, LeftPanel, RightPanel } from "../panels";

export const Container: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: ${color.modal.background.dark};
`;

export const Loader: typeof ChaosTokenRevealLoader = styled(
	ChaosTokenRevealLoader,
).attrs({
	size: 150,
})`
`;

export const Content: typeof View = styled(View)`

  position: relative;
`;

export const TopView: typeof View = styled(View)`
  bottom: 165px; 
  position: absolute;
  left: -90px;
  right: -90px;
  align-items: center;
`;

export const BottomView: typeof BottomPanel = styled(BottomPanel)`
  top: 170px; 
  position: absolute;
  left: -20px;
  right: -20px;
`;

export const LeftView: typeof LeftPanel = styled(LeftPanel)`
  right: 160px;
  position: absolute;
  top: 0;
  bottom: 0;
`;

export const RightView: typeof LeftPanel = styled(RightPanel)`
  left: 160px;
  position: absolute;
  top: 0;
  bottom: 0;
`;

export const CenterView: typeof CenterPanel = styled(CenterPanel)`

`;

export const OneMoreLoader: typeof Loader = styled(Loader)`
  flex: 1;
`;

export const OneMoreLoaderCancel: typeof TouchableOpacity = styled(
	TouchableOpacity,
)`
  position: absolute;
  z-index: 5;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
