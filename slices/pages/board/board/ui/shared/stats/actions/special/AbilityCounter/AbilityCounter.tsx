import type { ViewProps } from "react-native";

import { setAbilityCounterEffect } from "@entities/abilities/lib";
import {
	selectAbilityCounter,
	selectCurrentBoardProp,
	selectInvestigatorCounterEnabled,
	setAbilityCounter,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { PickerChangeEvent } from "@widgets/control/picker";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
import * as C from "./AbilityCounter.components";
import { getValueStyle } from "./AbilityCounter.style";
import { backgrounds } from "./backgrounds";
export type AbilityCounterProps = ViewProps & {
	ability: InvestigatorAbility;
	defaultValue?: number;
	min?: number;
	max?: number;
};

export const AbilityCounter = ({
	ability,
	defaultValue,
	min = 0,
	max = 99,
	...props
}: AbilityCounterProps) => {
	const dispatch = useAppDispatch();
	const { id } = ability;
	const source = backgrounds[id];
	const { code } = useAppSelector(selectCurrentBoardProp("investigator"));

	const value = useAppSelector(selectAbilityCounter(id));
	const enabled = useAppSelector(selectInvestigatorCounterEnabled(code, id));

	const direction =
		(ability.type === "counter" && ability.direction) || "decrease";

	const valueStyle = getValueStyle(id);

	const data = useMemo(() => {
		return range(min, max + 1);
	}, [min, max]);

	const setValue = useCallback(
		(nextValue: number) => {
			dispatch(setAbilityCounter(id, nextValue));

			dispatch(
				setAbilityCounterEffect({
					abilityId: id,
					value: nextValue,
					prevValue: value,
				}),
			);
		},
		[dispatch, value, id],
	);

	const onChange = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			setValue(value);
		},
		[setValue],
	);

	const increase = useCallback(() => {
		const nextValue = Math.min(max, value + 1);
		setValue(nextValue);
	}, [setValue, value, max]);

	const decrease = useCallback(() => {
		if (value <= min) {
			return;
		}
		setValue(value - 1);
	}, [value, min, setValue]);

	const onPress = direction === "increase" ? increase : decrease;

	const reset = useCallback(() => {
		const value = defaultValue || 0;
		setValue(value);
	}, [defaultValue, setValue]);

	if (!enabled) {
		return;
	}

	return (
		<C.Container {...props} source={source}>
			<C.Counter
				valueStyle={valueStyle}
				value={value}
				data={data}
				onValueChanged={onChange}
				onPress={onPress}
				onLongPress={reset}
			/>
		</C.Container>
	);
};
