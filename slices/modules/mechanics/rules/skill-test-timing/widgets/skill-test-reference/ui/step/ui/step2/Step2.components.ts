import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import type { SkillType } from "@shared/model";
import {
	Value as BaseValue,
	type ValueProps as BaseValueProps,
	NumericControl,
} from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
`;

export const Control: typeof NumericControl = styled(NumericControl).attrs({
	buttonStyle: {
		backgroundColor: "transparent",
	},
	textStyle: {
		color: color.title,
	},
	disabledTextStyle: {
		color: color.gray20,
	},
})`
  
`;

export const Content: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
  width: 24px;
  align-items: center;
`;

type ValueProps = BaseValueProps & {
	skillType: SkillType;
};

export const Value: FC<ValueProps> = styled(BaseValue)`
  font-size: 22px;
  ${({ skillType }: ValueProps) => css`
    color: ${color.skill[skillType].light};
  `}
`;
