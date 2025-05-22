import { color, size } from "@shared/config";
import { Icon, Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../../../../../haptic";
import { DescriptionPanel } from "../DescriptionPanel";

export const Container: typeof View = styled(View)`
  gap: 10px;
`;

export const Actions: typeof Row = styled(Row)`
  padding: 0 ${size.gap.default}px;
  justify-content: space-between;
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

export const Description: typeof DescriptionPanel = styled(DescriptionPanel)`
`;
