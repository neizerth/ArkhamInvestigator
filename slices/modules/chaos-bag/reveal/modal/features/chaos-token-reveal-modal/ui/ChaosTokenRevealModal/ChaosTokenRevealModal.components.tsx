import { CustomModal } from "@modules/core/modal/shared/base/ui";
import type { View } from "react-native";
import styled from "styled-components/native";
import { ChaosTokenOneMoreRevealLoader } from "../ChaosTokenOneMoreRevealLoader";
import { ChaosTokenRevealModalContent } from "../ChaosTokenRevealModalContent";
import {
	BottomPanel,
	CenterPanel,
	LeftPanel,
	RightPanel,
	TopPanel,
} from "../panels";

export const Container: typeof CustomModal = styled(CustomModal)`

`;

export const OneMoreLoader: typeof ChaosTokenOneMoreRevealLoader = styled(
	ChaosTokenOneMoreRevealLoader,
)`
  position: absolute;
  z-index: 5;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Content: typeof ChaosTokenRevealModalContent = styled(
	ChaosTokenRevealModalContent,
)`
`;

export const TopView: typeof View = styled(TopPanel)`
  position: absolute;
  bottom: 165px; 
  left: -90px;
  right: -90px;
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
