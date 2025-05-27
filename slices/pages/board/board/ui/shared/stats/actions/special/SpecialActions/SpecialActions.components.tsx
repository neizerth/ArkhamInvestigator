import { Row } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import {
	Ability as BaseAbility,
	type AbilityProps as BaseAbilityProps,
} from "../Ability";
import { AbilityCounter, type AbilityCounterProps } from "../AbilityCounter";
import { AdditionalAction } from "../AdditionalAction";

export const Container: typeof Row = styled(Row)`
  align-items: center;
  width: 120px;
  flex-wrap: wrap-reverse;
`;

export const Additional: typeof AdditionalAction = styled(AdditionalAction)`
  
`;

type PropsWithIndex = {
	index: number;
};

const abilityStyle = css<PropsWithIndex>`
  ${({ index }: PropsWithIndex) =>
		index > 0 &&
		index % 2 === 0 &&
		css`
    margin-left: 18px;
  `}
`;

type AbiityProps = BaseAbilityProps & PropsWithIndex;
export const Ability: FC<AbiityProps> = styled(BaseAbility)`
  ${abilityStyle};
`;

type CounterProps = AbilityCounterProps & PropsWithIndex;

export const Counter: FC<CounterProps> = styled(AbilityCounter)`
  ${abilityStyle};
`;
