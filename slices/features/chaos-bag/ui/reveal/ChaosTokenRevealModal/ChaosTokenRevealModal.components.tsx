import { color, size } from "@shared/config";
import { Icon, IconNumber, Row, StatIcon, TextView } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../../../haptic";
import { BlessCurseControl, ChaosTokenPreview } from "../../token";
import { ChaosTokenRevealHistoryMemo as ChaosTokenRevealHistory } from "../ChaosTokenRevealHistory";
import { ChaosTokenRevealLoader } from "../ChaosTokenRevealLoader";

export const Container: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Loader: typeof ChaosTokenRevealLoader = styled(
	ChaosTokenRevealLoader,
).attrs({
	size: 150,
})`
`;

export const LastToken: typeof ChaosTokenPreview = styled(
	ChaosTokenPreview,
).attrs({
	size: 150,
	tokenPadding: 5,
	sealOffset: 5,
})`
  
`;

export const TokenButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  
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

export const BottomView: typeof View = styled(View)`
  top: 160px; 
  position: absolute;
  left: 0;
  right: 0;
`;

export const LeftView: typeof View = styled(View)`
  right: 160px;
  position: absolute;
  top: 0;
  bottom: 0;
`;

export const Actions: typeof Row = styled(Row)`
  padding: 0 ${size.gap.default}px;
  justify-content: space-between;
`;

export const SideActions: typeof View = styled(View)`
  padding: ${size.gap.small}px 0;
  justify-content: space-between;
  /* justify-content: flex-end; */
  height: 150px;
`;

export const LeftActions: typeof SideActions = styled(SideActions)`
  align-items: flex-end;
`;

export const Action: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  position: relative;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const ReturnIcon: typeof Icon = styled(Icon)`
  position: absolute;
  left: -10px;
  font-size: 60px;
  line-height: 60px;
  color: #FFFBF2;
`;

export const ReturnAllIcon: typeof Icon = styled(ReturnIcon)`
  position: absolute;
  left: 8px;
  top: 7px;
  font-size: 25px;
  line-height: 25px;
  color: ${color.text};
`;

export const ReturnFillIcon: typeof Icon = styled(Icon)`
  position: absolute;
  font-size: 40px;
  line-height: 40px;
  color: #FB4135;
`;

export const Return: typeof Action = styled(Action)`
  background-color: #D6CFB9;
`;

export const RevealMore: typeof Action = styled(Action)`
  border: 1px dashed ${color.light20};

  background-color: rgba(0, 0, 0, 0.2);
`;

export const RevealMoreIcon: typeof Icon = styled(Icon)`
  position: absolute;
  left: -5px;
  font-size: 50px;
  line-height: 50px;
  color: ${color.light20};
`;

export const ActionTitle: typeof TextView = styled(TextView)`
  
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

export const SkillValue: typeof Row = styled(Row)`
  padding-top: ${size.gap.medium}px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const SkillValueText: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	strokeStyle: {
		color: color.text,
	},
})`
  color: ${color.white};
  font-size: 50px;
`;

export const SkillTypeIcon: typeof StatIcon = styled(StatIcon)`
  font-size: 35px;
  line-height: 40px;
  color: white;
`;

export const SkillType: typeof View = styled(View)`
  position: absolute;
  top: -8px;
  right: -30px;
`;
