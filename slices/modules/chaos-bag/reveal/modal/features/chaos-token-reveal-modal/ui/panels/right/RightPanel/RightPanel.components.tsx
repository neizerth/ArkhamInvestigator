import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, size } from "@shared/config";
import { IconNumber, type IconNumberProps, Text } from "@shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { DifficultyControl } from "../DifficultyControl";
import { SkillCheckResult } from "../SkillCheckResult";

export const Container: typeof View = styled(View)`

`;

export const Content: typeof View = styled(View)`
  padding: ${size.gap.small}px 0;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
`;

const ValueSymbol: typeof Text = styled(Text)`
  position: absolute;
  top: -7px;
  left: -10px;
  color: ${color.white};
  font-size: 25px;
`;

export const CompareSymbol: typeof ValueSymbol = styled(ValueSymbol)`

`;

export const ResultSymbol: typeof ValueSymbol = styled(ValueSymbol)`
  left: -12px;
  top: 20px;
`;

export const Item: typeof View = styled(View)`
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

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
  
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	strokeStyle: {
		color: color.text,
	},
})`
  color: ${color.white};
  min-width: 38px;
  ${({ value }: IconNumberProps) => css`
    font-size: ${valueFontSize[value.toString().length] || 25}px;
  `}
`;

export const DifficultyPicker: typeof DifficultyControl = styled(
	DifficultyControl,
)`
  margin-top: -15px;
`;

export const Result: typeof SkillCheckResult = styled(SkillCheckResult)`
  width: 100%;
`;
