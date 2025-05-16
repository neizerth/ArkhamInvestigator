import { color, size } from "@shared/config";
import { IconNumber, type IconNumberProps, Row, StatIcon } from "@shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  right: 160px;
  position: absolute;
  top: 0;
  bottom: 0;
`;

export const Actions: typeof View = styled(View)`
  padding: ${size.gap.small}px 0;
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
`;

export const SkillValue: typeof Row = styled(Row)`
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

export const SkillValueText: typeof IconNumber = styled(IconNumber).attrs({
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

export const SkillTypeIcon: typeof StatIcon = styled(StatIcon)`
  font-size: 35px;
  line-height: 40px;
  color: white;
`;

export const SkillType: typeof View = styled(View)`
  position: absolute;
  top: -8px;
  right: -25px;
`;
