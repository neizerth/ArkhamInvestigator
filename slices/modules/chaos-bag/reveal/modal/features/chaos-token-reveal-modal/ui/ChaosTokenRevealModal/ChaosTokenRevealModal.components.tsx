import { ChaosTokenRevealLoader } from "@features/game/chaos-bag";
import { TouchableOpacity } from "@modules/core/haptic/shared/ui";
import { CustomModal } from "@modules/core/modal/shared/base/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import {
	BottomPanel,
	CenterPanel,
	LeftPanel,
	RightPanel,
	TopPanel,
} from "../panels";

export const Container: typeof CustomModal = styled(CustomModal)`
  justify-content: center;
  align-items: center;
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

export const TopView: typeof View = styled(TopPanel)`
  position: absolute;
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
