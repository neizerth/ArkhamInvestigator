import { color, size } from "@shared/config";
import { IconNumber, type IconNumberProps, Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "../../../../../../../haptic";

export const Container: typeof View = styled(View)`
`;

export const Actions: typeof View = styled(View)`
  padding: ${size.gap.small}px 0;
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
`;

export const CompareSymbol: typeof Text = styled(Text)`
  position: absolute;
  top: -7px;
  left: -12px;
  color: ${color.white};
  font-size: 25px;
`;

export const Difficulty: typeof Row = styled(Row)`
  padding-top: ${size.gap.medium}px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const valueFontSize: Record<number, number> = {
	1: 50,
	2: 50,
	3: 30,
	4: 28,
};

export const DifficultyButton: typeof TouchableOpacity = styled(
	TouchableOpacity,
)`
  
`;

export const DifficultyText: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	strokeStyle: {
		color: color.text,
	},
})`
  color: ${color.white};
  ${({ value }: IconNumberProps) => css`
    font-size: ${valueFontSize[value.toString().length] || 25}px;
  `}
  
`;
