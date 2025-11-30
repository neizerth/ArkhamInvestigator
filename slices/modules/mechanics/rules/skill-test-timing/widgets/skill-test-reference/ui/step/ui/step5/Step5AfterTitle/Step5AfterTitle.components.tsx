import { color } from "@shared/config";
import type { SkillType } from "@shared/model";
import {
	Value as BaseValue,
	type ValueProps as BaseValueProps,
} from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  
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
