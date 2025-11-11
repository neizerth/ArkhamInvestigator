import { AutoFail, AutoSuccessThin } from "@modules/chaos-bag/base/shared/ui";
import { color, size } from "@shared/config";
import type { SkillType } from "@shared/model";
import { Row, Text } from "@shared/ui";
import {
	Value as BaseValue,
	type ValueProps as BaseValueProps,
} from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  padding-top: 7px;
`;

export const Content: typeof Row = styled(Row)`
  align-items: center;
  justify-content: center;
  gap: ${size.gap.small}px;
`;

export const Group: typeof Row = styled(Row)`
  position: relative;
  gap: ${size.gap.small}px;
`;

export const Modifier: typeof View = styled(View)`

`;

export const Strikethrough: typeof View = styled(View)`
  position: absolute;
  z-index: 2;
  bottom: 15px;
  right: 2px;
  width: 100%;
  height: 1px;
  background-color: red;
  transform: rotate(-35deg);
`;

type ValueProps = BaseValueProps & {
	skillType?: SkillType;
};

export const Value: FC<ValueProps> = styled(BaseValue).attrs({
	scale: false,
})`
  font-size: 22px;
  ${({ skillType }: ValueProps) =>
		skillType &&
		css`
    color: ${color.skill[skillType].light}
  `}
`;

export const Difficulty: typeof BaseValue = styled(BaseValue).attrs({
	textStyle: {
		color: color.text,
	},
})`
  font-size: 22px;
`;

export const Sign: typeof Text = styled(Text)`
  font-size: 22px;
  line-height: 22px;
  top: 2px;
  color: ${color.text};
`;

export const Result: typeof View = styled(View)`
  width: 30px;
`;

export const Success: typeof AutoSuccessThin = styled(AutoSuccessThin)`
  left: -6px;
  height: 42px;
`;

export const Fail: typeof AutoFail = styled(AutoFail)`
  font-size: 32px;
	line-height: 40px;
	width: 40px;
`;
