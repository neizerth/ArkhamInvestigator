import { color, size } from "@shared/config";
import { IconNumber, Row, StatIcon } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

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
  right: -25px;
`;
